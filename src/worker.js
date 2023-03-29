console.log("I'm alive!");
postMessage("READY");

onmessage = ({ data }) => {
  console.log("received from worker", data);
};
