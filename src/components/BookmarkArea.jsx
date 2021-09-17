import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
export default function BookmarkArea(props) {
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState({});
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const fetchVideoById = async () => {
    setLoading(true);
    console.log("fetching...");
    try {
      const response = await fetch(
        `http://localhost:3001/videos/${props.videoId}`
      );
      if (response.ok) {
        const video = await response.json();

        setVideo(video);
      } else {
        setError("video is not fetched");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVideoById();
  }, [props.videoId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/videos/${props.videoId}/bookmark`,
        {
          method: "PUT",
          body: JSON.stringify({
            text,
            time: props.time,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchVideoById();
        setText("");
      }
    } catch (error) {
      alert("bookmark not sent");
    }
  };
  return (
    <div>
      <div style={{ marginTop: 20 }}>
        {video && video.bookmarks && (
          <ListGroup style={{ height: "80vh", overflowY: "auto" }}>
            {video.bookmarks
              .sort((a, b) => a.time - b.time)
              .map((bookmark, i) => (
                <ListGroup.Item
                  style={
                    video.bookmarks[i + 1]
                      ? {
                          backgroundColor:
                            props.time >= bookmark.time &&
                            props.time < video.bookmarks[i + 1].time
                              ? "#5e55ad"
                              : "white",
                          color:
                            props.time >= bookmark.time &&
                            props.time < video.bookmarks[i + 1].time
                              ? "white"
                              : "inherit",
                          cursor: "pointer",
                        }
                      : {
                          cursor: "pointer",
                        }
                  }
                  onClick={() => {
                    props.onTimeChange(bookmark.time);
                  }}
                >
                  {moment.utc(bookmark.time * 1000).format("HH:mm:ss")}{" "}
                  {bookmark.text}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            disabled
            value={moment.utc(props.time * 1000).format("HH:mm:ss")}
            placeholder="Current Time"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button style={{ width: "100%" }} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
