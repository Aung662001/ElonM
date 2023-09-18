import { useEffect, useState, useContext } from "react";
import Post from "../components/PostCard";
import { Box, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import NewComment from "./NewComment";
import { AuthContext } from "../ThemedApp";
import { addNewComment, fetchComments } from "../libs/fetcher";
export default function Comment() {
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [posts, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    (async function () {
      setLoading(true);
      const data = await fetchComments(id);
      if (data) {
        setPost([data]);
        setComments([...data.comments]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
  }, [id]);
  //add new comment
  const addComment = async (e) => {
    //type,content,userId
    e.preventDefault();
    const result = await addNewComment(
      "comment",
      content,
      authUser._id,
      posts[0]._id
    );
    if (result) {
      const updatePost = await fetchComments(posts[0]._id);
      setPost([updatePost]);
      setContent("");
    }
  };
  function LikeClick(_id) {
    setPost(
      posts.map((post) => {
        if (post._id == _id) {
          if (post.likes.includes(authUser._id)) {
            post.likes = post.likes.filter((like) => like !== authUser._id);
          } else {
            post.likes.push(authUser._id);
          }
        }
        return post;
      })
    );
  }
  function CommentLikeClick(_id) {
    setComments(
      comments.map((comment) => {
        if (comment._id == _id) {
          if (comment.likes.includes(authUser._id)) {
            comment.likes = comment.likes.filter(
              (like) => like !== authUser._id
            );
          } else {
            comment.likes.push(authUser._id);
          }
        }
        return comment;
      })
    );
  }
  return (
    <>
      {!loading && posts.length ? (
        <Box>
          <Post
            post={posts[0]}
            key={posts[0]._id}
            primary={true}
            LikeClick={LikeClick}
          />
          <NewComment
            addComment={addComment}
            content={content}
            setContent={setContent}
          />

          {posts[0].comments &&
            posts[0].comments.map((comment) => {
              return (
                <Post
                  post={comment}
                  key={comment._id}
                  LikeClick={CommentLikeClick}
                />
              );
            })}
        </Box>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
