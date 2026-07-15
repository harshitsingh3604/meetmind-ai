import { getDashboardStats } from "../models/dashboardModel.js";

export const getDashboardStatistics = async (req, res) => {
  try {

    const stats = await getDashboardStats(req.user.id);

    return res.status(200).json({
      success: true,
      data: stats,
    });

  } catch (error) {

    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics.",
    });

  }
};