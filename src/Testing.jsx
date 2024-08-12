import axios from "axios";

function Testing() {
  function get() {
    axios
      .post("http://localhost:3000/awb-tracking-details", {
        AWBID: "123ABC456",
      })
      .then((d) => {
        console.log(d);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <button onClick={() => {
        get()
      }}>Submit</button>
    </div>
  );
}

export default Testing;