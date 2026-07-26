

const Comment = ({ comment, setComment }) => {

    return (
        <div>
            <h1>Comentário</h1>
            <textarea name="text" placeholder="digite seu comentário aqui" onChange={(e) => setComment(e.target.value)} value={comment}>
            </textarea>
        </div>
    )
}

export default Comment;