import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";

const MeetingDetails = () => {
    const { id } = useParams();

    const [meeting, setMeeting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [summary, setSummary] = useState("");
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState("");

    const [keyPoints, setKeyPoints] = useState("");
    const [keyPointsLoading, setKeyPointsLoading] = useState(false);
    const [keyPointsError, setKeyPointsError] = useState("");

    const [actionItems, setActionItems] = useState("");
    const [actionItemsLoading, setActionItemsLoading] = useState(false);
    const [actionItemsError, setActionItemsError] = useState("");

    const [followupEmail, setFollowupEmail] = useState("");
    const [followupEmailLoading, setFollowupEmailLoading] = useState(false);
    const [followupEmailError, setFollowupEmailError] = useState("");

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                setLoading(true);

                const response = await api.get(`/meetings/${id}`);

                setMeeting(response.data.data || []);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load meeting."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMeeting();
    }, [id]);

    const handleGenerateSummary = async () => {
        try {
            setSummaryLoading(true);
            setSummaryError("");

            const response = await api.post("/ai/summary", {
                meetingNotes: meeting.meetingNotes,
            });

            setSummary(response.data.summary || "");

        } catch (error) {
            console.error(error);

            setSummaryError(
                error.response?.data?.message ||
                "Failed to generate AI response."
            );
        } finally {
            setSummaryLoading(false);
        }
    };

    const handleGenerateKeyPoints = async () => {
        try {
            setKeyPointsLoading(true);
            setKeyPointsError("");

            const response = await api.post("/ai/key-points", {
                meetingNotes: meeting.meetingNotes,
            });

            setKeyPoints(response.data.keyPoints || "");

        } catch (error) {
            console.error(error);

            setKeyPointsError(
                error.response?.data?.message ||
                "Failed to generate AI response."
            );
        } finally {
            setKeyPointsLoading(false);
        }
    };

    const handleGenerateActionItems = async () => {
        try {
            setActionItemsLoading(true);
            setActionItemsError("");

            const response = await api.post("/ai/action-items", {
                meetingNotes: meeting.meetingNotes,
            });

            setActionItems(response.data.actionItems || []);

        } catch (error) {
            console.error(error);

            setActionItemsError(
                error.response?.data?.message ||
                "Failed to generate AI response."
            );
        } finally {
            setActionItemsLoading(false);
        }
    };

    const handleGenerateFollowupEmail = async () => {
        try {
            setFollowupEmailLoading(true);
            setFollowupEmailError("");

            const response = await api.post("/ai/followup", {
                meetingNotes: meeting.meetingNotes,
            });

            setFollowupEmail(response.data.followupEmail || "");

        } catch (error) {
            console.error(error);

            setFollowupEmailError(
                error.response?.data?.message ||
                "Failed to generate AI response."
            );
        } finally {
            setFollowupEmailLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="ml-64 flex flex-1 flex-col">

                <Navbar />

                <main className="flex-1 p-8 md:p-8">

                    <div className="mx-auto max-w-5xl">

                        <h1 className="mb-8 text-3xl font-bold text-gray-800">
                            Meeting Details
                        </h1>

                        {loading ? (

                            <div className="rounded-xl bg-white p-10 text-center shadow-md">
                                Loading meeting...
                            </div>

                        ) : error ? (

                            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
                                {error}
                            </div>

                        ) : (

                            <div className="flex-1 p-8 md:p-8">

                                {/* Meeting Information */}

                                <div className="rounded-xl bg-white p-8 shadow-md">

                                    <h2 className="mb-6 text-xl font-semibold">
                                        Meeting Information
                                    </h2>

                                    <div className="grid gap-6 md:grid-cols-2">

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Title
                                            </p>

                                            <p className="font-medium">
                                                {meeting.title}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Meeting Type
                                            </p>

                                            <p className="font-medium">
                                                {meeting.meetingType}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Participants
                                            </p>

                                            <p className="font-medium">
                                                {meeting.participants || "N/A"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Meeting Date
                                            </p>

                                            <p className="font-medium">
                                                {new Date(
                                                    meeting.meetingDate
                                                ).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* Original Notes */}

                                <div className="rounded-xl bg-white p-8 shadow-md">

                                    <h2 className="mb-4 text-xl font-semibold">
                                        Original Notes
                                    </h2>

                                    <p className="whitespace-pre-line text-gray-700">
                                        {meeting.meetingNotes}
                                    </p>

                                </div>

                                {/* AI Summary Cards */}
                                <div className="rounded-xl bg-white p-8 shadow-md">

                                    <h2 className="mb-4 text-xl font-semibold">
                                        AI Summary
                                    </h2>

                                    {summaryError && (
                                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                                            {summaryError}
                                        </div>
                                    )}

                                    <div className="mb-6 rounded-lg bg-gray-50 p-4">

                                        {summary ? (
                                            <p className="whitespace-pre-line text-gray-700">
                                                {summary}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500">
                                                No summary generated yet.
                                            </p>
                                        )}

                                    </div>

                                    <button
                                        onClick={handleGenerateSummary}
                                        disabled={summaryLoading}
                                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {summaryLoading
                                            ? "Generating Summary..."
                                            : "Generate Summary"}
                                    </button>

                                </div>

                                {/* Key Point Cards */}
                                <div className="rounded-xl bg-white p-8 shadow-md">

                                    <h2 className="mb-4 text-xl font-semibold">
                                        Key Points
                                    </h2>

                                    {keyPointsError && (
                                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                                            {keyPointsError}
                                        </div>
                                    )}

                                    <div className="mb-6 rounded-lg bg-gray-50 p-4">

                                        {keyPoints ? (
                                            <p className="whitespace-pre-line text-gray-700">
                                                {keyPoints}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500">
                                                No key points generated yet.
                                            </p>
                                        )}

                                    </div>

                                    <button
                                        onClick={handleGenerateKeyPoints}
                                        disabled={keyPointsLoading}
                                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {keyPointsLoading
                                            ? "Generating Key Points..."
                                            : "Generate Key Points"}
                                    </button>

                                </div>

                                {/* Action Items Cards */}
                                <div className="rounded-xl bg-white p-8 shadow-md">

                                    <h2 className="mb-4 text-xl font-semibold">
                                        Action Items
                                    </h2>

                                    {actionItemsError && (
                                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                                            {actionItemsError}
                                        </div>
                                    )}

                                    <div className="mb-6 rounded-lg bg-gray-50 p-4">

                                        {actionItems ? (
                                            <p className="whitespace-pre-line text-gray-700">
                                                {actionItems}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500">
                                                No action items generated yet.
                                            </p>
                                        )}

                                    </div>

                                    <button
                                        onClick={handleGenerateActionItems}
                                        disabled={actionItemsLoading}
                                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {actionItemsLoading
                                            ? "Generating Action Items..."
                                            : "Generate Action Items"}
                                    </button>

                                </div>

                                {/* Follow-up Email Cards */}
                                <div className="rounded-xl bg-white p-8 shadow-md">

                                    <h2 className="mb-4 text-xl font-semibold">
                                        Follow-up Email
                                    </h2>

                                    {followupEmailError && (
                                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                                            {followupEmailError}
                                        </div>
                                    )}

                                    <div className="mb-6 rounded-lg bg-gray-50 p-4">

                                        {followupEmail ? (
                                            <pre className="whitespace-pre-wrap font-sans text-gray-700">
                                                {followupEmail}
                                            </pre>
                                        ) : (
                                            <p className="text-gray-500">
                                                No follow-up email generated yet.
                                            </p>
                                        )}

                                    </div>

                                    <button
                                        onClick={handleGenerateFollowupEmail}
                                        disabled={followupEmailLoading}
                                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {followupEmailLoading
                                            ? "Generating Email..."
                                            : "Generate Email"}
                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
};

export default MeetingDetails;