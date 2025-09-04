import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(request: any) {
  try {
    // Extract the email and password from the request body
    const { email, password } = await request.json();

    // Make the POST request to the external authentication service
    const authResponse = await fetch(
      "http://192.168.1.74:5002/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          dauth: "1234567", // Add your `dauth` header if needed
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const data = await authResponse.json();

    // If login is successful, we get the access_token
    if (authResponse.ok && data.access_token) {
      // Set the access_token in the cookies
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        cookie.serialize("access_token", data.access_token, {
          httpOnly: true, // Makes the cookie inaccessible to JavaScript
          secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
          maxAge: 60 * 60 * 24 * 7, // Cookie expiration (7 days)
          path: "/", // Available across the entire app
        })
      );

      // Return a success response
      return NextResponse.json({ message: "Login successful" }, { headers });
    } else {
      // Return error if authentication fails
      return NextResponse.json(
        { message: data.message || "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
