import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setIsSelected(true);
    }
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/uploads",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" name="file" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
