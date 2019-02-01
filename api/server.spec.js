const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  describe("GET / endpoint", () => {
    it("should respond with status code 200 OK", async () => {
      let response = await request(server).get("/");

      expect(response.status).toBe(200);
    });

    it('should responsd with JSON', async () => {
        let response = await request(server).get('/')
        expect(response.type).toMatch(/json/i);
    })

    it('should send back an object with an api key', async () => {
        const expected = {api: 'up'} 
        let response = await request(server).get('/')
        expect(response.body).toEqual(expected);
    })
  });
  describe("POST / endpoint", () => {
    it("should respond with status code 201 OK", async () => {
      let response = await request(server).post("/").send({ name: 'austin' });

      expect(response.status).toBe(201);
    });

    it('should responsd with JSON', async () => {
        let response = await request(server).post('/')
        expect(response.type).toMatch(/json/i);
    })
  });

  describe("Delete / endpoint", () => {
    it("should respond with status code 200 OK", async () => {
      let response = await request(server).delete("/:id");

      expect(response.status).toBe(200);
    });

    it('should responsd with JSON', async () => {
        let response = await request(server).delete('/:id')
        expect(response.type).toMatch(/json/i);
    })
  });
});
