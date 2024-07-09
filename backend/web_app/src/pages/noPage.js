import HeadingComponent from "../components/headingComponent/heading";


function NoPage() {
  return (
    <div className="App d-flex justify-content-center align-items-center flex-column" style={{ height: "80vh" }}>
      <HeadingComponent text="Page Not Found" fontSize={"5rem"} color="#0000005c" fontWeight={600} margin="20px " />
      <HeadingComponent text="Sorry, we could not find this page" fontSize={"2.625rem"} color="#3b3b3b" fontWeight={500} />
    </div>
  );
}

export default NoPage;
