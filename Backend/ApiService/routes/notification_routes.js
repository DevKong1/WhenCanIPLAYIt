/* app.route("/api/notifications/subscribe")
	.post(requireAuth, async (req, res) => {
		const subscription = req.body
		try {
            // Save subscription to DB
            subscription.expirationTime = moment().add(1, "d")
            subscription.user = req.user._id
            await Subscription.deleteMany({ endpoint: subscription.endpoint })
            await Subscription.create(subscription)
            // Send 201 - resource created
            res.status(201).send()
		} catch (e) {
            console.error(e)
            res.status(500).send({ description: e })
		}
    });
	
app.route("/api/notifications/test")
    .get(requireAuth, async (req, res) => {
        try {
            await sendNotification(req.user._id, {
            title: "Push test title",
            body: "Push test body"
            })
            res.status(201).send()
        } catch (e) {
            console.error(e)
            res.status(500).send({ description: e })
        }
    }); */