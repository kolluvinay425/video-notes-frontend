import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
export default function AddVideo(props) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("video", file);
      formData.append("title", title);
      formData.append("description", description);
        
      const response = await fetch("http://localhost:3001/videos", {
        method: "post",
        body: formData,
      });
      if (response.ok) {
       props.fetchVideos()
      } else {
        console.log("not sent")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(false);
    }
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Video</Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={open}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Video</Form.Label>
              <Form.Control
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                }}
                accept="video/*"
                type="file"
                placeholder="Video"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Video title"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Video Description"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
            <Button style={{marginLeft:10}}  type="submit" variant="primary" >
            Upload
          </Button>
          </Form>
        </Modal.Body>
        
      </Modal>
    </div>
  );
}
