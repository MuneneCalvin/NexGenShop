const NexGenRoutes = (app) => {

    // Authentication
    app.route("/register")
        .get()
        .post()

    app.route("/login")
        .get()
        .post()
        .put()
        .delete()
}

export default NexGenRoutes;