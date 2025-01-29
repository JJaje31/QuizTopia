
const Intro = () => {
    return(
    <>
 <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(/images/Quiz.jpeg)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-white text-center">
    <div className="max-w-md my-5">
      <h1 className="mb-5 text-4xl font-bold">Welcome to QuizTopia!</h1>
      <p className="text-lg mb-5">
      Dive into the ultimate trivia adventure where knowledge meets fun! Explore a world of quizzes on countless topics, challenge your brain, and compete
       with friends or players worldwide. Whether you're a trivia master or just love learning something new, QuizTopia is your gateway to endless entertainment
        and discovery.
      </p>
      <h5 className="text-lg">Features Include:</h5>
      <br/>
      <ul className="text-m list-disc">
        <li>Customizable quizzes tailored to your interests.</li>
        <br/>
        <li>Leaderboards to track your progress and compete globally.</li>
        <br/>
        <li>Interactive gameplay with rewards and achievements.</li>
        <br/>
        <li>Fresh content for each user keeping the excitement alive.</li>
        <br/>
        <li>Get ready to test your wits, sharpen your mind, and have fun while you're at it. Your QuizTopia adventure begins now!</li>
      </ul>
      <div className="flex justify-center mt-5">
      <a href="/signup"><button className="btn btn-primary mr-5">Get Started</button></a>
      <a href="/signin"><button className="w-[112px] btn btn-primary ml-5">Sign In</button></a>
      </div>
    </div>
  </div>
</div>
    </>
    )
}
export default Intro