function Home() {
  console.log("rendering home component");
  return (
    <div className="homepage">
      <h1>Welcome to my Basic Chat App!</h1>
      <p>
        This app was made for both my portfolio and for learning purposes.
        Please head to the top right Login to get started! <br />
        <b>NOTE:</b> My NodeJS server is being hosted on render.com and the
        service is spun down when it is inactive for awhile, if you are checking
        this app out, if you go attempt to login/signup it should poke the
        service, it should be spun up in a few minutes.
        {`(You may also need a refresh)`}
      </p>
    </div>
  );
}

export default Home;
