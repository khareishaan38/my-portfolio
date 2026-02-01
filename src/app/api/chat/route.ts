import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

// Load the knowledge base
function getKnowledgeBase(): string {
    const filePath = path.join(process.cwd(), "src/data/professional-profile.md");
    try {
        return fs.readFileSync(filePath, "utf-8");
    } catch {
        console.error("Failed to load professional-profile.md");
        return "";
    }
}

const SYSTEM_PROMPT = `You are the professional assistant for Ishaan Khare's portfolio website.

STRICT RULES:
1. Only answer based on the provided profile markdown
2. If asked about topics not in the profile, politely decline
3. Steer conversations toward Ishaan's technical or product work, could be PMSense or more products which Ishaan will add in the future
4. Be concise, professionally witty, and helpful
5. Never make up information not in the profile

Here is Ishaan's professional profile:

`;

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "Messages array required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API key not configured" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const knowledgeBase = getKnowledgeBase();

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-lite",
            systemInstruction: SYSTEM_PROMPT + knowledgeBase,
        });

        // Convert messages to Gemini format
        // Filter out any assistant messages before the first user message
        // (Gemini requires history to start with a user message)
        const allMessages = messages.slice(0, -1);
        const firstUserIndex = allMessages.findIndex((msg: { role: string }) => msg.role === "user");
        const validMessages = firstUserIndex >= 0 ? allMessages.slice(firstUserIndex) : [];

        const history = validMessages.map((msg: { role: string; content: string }) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({ history });
        const lastMessage = messages[messages.length - 1].content;

        // Stream the response
        const result = await chat.sendMessageStream(lastMessage);

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) {
                            controller.enqueue(encoder.encode(text));
                        }
                    }
                    controller.close();
                } catch (error) {
                    console.error("Streaming error:", error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate response" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
