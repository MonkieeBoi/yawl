// Annotation docs: https://swagger.io/docs/specification/v3_0/about/

function routes(app) {
    /**
     * @openapi
     * /checkhealth:
     *   get:
     *     description: Checks if server is up
     *     tags:
     *       - Health
     *     responses:
     *       200:
     *         description: Server is running
     */
    app.get('/checkhealth', (req, res) => {
        res.SendStatus(200);
    });
}
