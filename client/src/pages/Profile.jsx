const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          My Profile
        </h1>

        <div className="rounded-xl bg-white p-8 shadow">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
              H
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                Harshit Singh
              </h2>

              <p className="mt-1 text-gray-600">
                harshit@example.com
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-gray-500">
                    Total Meetings
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    0
                  </h3>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-gray-500">
                    AI Summaries
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    0
                  </h3>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-gray-500">
                    Pending Tasks
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    0
                  </h3>
                </div>
              </div>

              <button
                className="mt-8 rounded-lg bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;