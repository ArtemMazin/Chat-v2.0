export const PostItem = (props) => {
  return (
    <div className='post'>
      <div className='post__content'>
        <h2>
          {props.number}. {props.post.title}
        </h2>
        <p>{props.post.body}</p>
      </div>
      <button className='post__button'>Удалить</button>
    </div>
  );
};
