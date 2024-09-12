import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FetchService {
    async get(url: string, headers = {}): Promise<any> {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        };

        try {
            const response = await fetch(url, options);
            return response.json();
        } catch (error) {
            return error;
        }
    }

    async post(url: string, body?: unknown, headers = {}): Promise<any> {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(body),
        };

        try {
            const response = await fetch(url, options);
            return response.json();
        } catch (error) {
            return error;
        }
    }

    async put(url: string, body?: unknown): Promise<any> {
        const token = localStorage?.getItem("access_token");

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

        try {
            const response = await fetch(url, options);
            return response.json();
        } catch (error) {
            return error;
        }
    }
}
