const request = require("supertest");
const app = require("../index");

describe("GET /api/whoami", () => {
  test("should return a JSON object with ipaddress, language and software", async () => {
    const expectedObj = {
      ipaddress: "::ffff:127.0.0.1",
      language: "en-US,en;q=0.8",
      software:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    };
    const response = await request(app)
      .get("/api/whoami")
      .set("Accept-Language", expectedObj.language)
      .set("User-Agent", expectedObj.software);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedObj);
  });
});
