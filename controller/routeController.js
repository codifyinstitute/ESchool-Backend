const Route = require("../model/routeName");

// GET all routes
const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching routes", error });
    }
};

// GET a route by ID
const getRouteById = async (req, res) => {
    const { id } = req.params;

    try {
        const route = await Route.findById(id);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: "Error fetching route", error });
    }
};

// POST a new route
const createRoute = async (req, res) => {
    const { RouteName } = req.body;

    try {
        const newRoute = new Route({ RouteName });
        await newRoute.save();
        res.status(201).json(newRoute);
    } catch (error) {
        res.status(500).json({ message: "Error creating route", error });
    }
};

// PUT update a route by ID
const updateRoute = async (req, res) => {
    const { id } = req.params;
    const { RouteName } = req.body;

    try {
        const updatedRoute = await Route.findByIdAndUpdate(
            id,
            { RouteName },
            { new: true }
        );

        if (!updatedRoute) {
            return res.status(404).json({ message: "Route not found" });
        }

        res.status(200).json(updatedRoute);
    } catch (error) {
        res.status(500).json({ message: "Error updating route", error });
    }
};

// DELETE a route by ID
const deleteRoute = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRoute = await Route.findByIdAndDelete(id);

        if (!deletedRoute) {
            return res.status(404).json({ message: "Route not found" });
        }

        res.status(200).json({ message: "Route deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting route", error });
    }
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
};
