const HomeScreen = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <title>Task Manager App</title>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl p-10 max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">📝 Task Manager App</h1>
        <p className="text-lg mb-6">
          Organiza tus tareas, mejora tu productividad y mantente enfocado.
        </p>
        <a
          href="/tasks"
          className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-100 transition duration-300"
        >
          Comenzar
        </a>
      </div>
    </div>
  );
};

export default HomeScreen;
