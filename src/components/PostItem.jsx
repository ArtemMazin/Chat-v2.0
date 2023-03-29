import MyButton from './UI/button/MyButton';

export const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post__content">
        <h2>
          {props.number}. {props.post.title}
        </h2>
        <p>{props.post.body}</p>
      </div>
      <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
    </div>
  );
};
