import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../../api/posts/queries/getAllPosts";
import { CREATE_POST } from "../../api/posts/mutations/createPost";
import "./PostsList.css";

const PostsList = () => {
    const { data, loading, error } = useQuery(GET_ALL_POSTS);
    const [createPost, newPost] = useMutation(CREATE_POST, {
        update(cache, { data: { createPost } }) {
            const posts = cache.readQuery({ query: GET_ALL_POSTS });
            cache.writeQuery({
                query: GET_ALL_POSTS,
                data: { ...posts, posts: { ...posts.posts, data: posts.posts.data.concat([createPost]) } }
            })
        }
    });

    const renderPosts = () => {
        return data?.posts.data.map(post => {
            return (
                <div key={post.id} className="PostsList-Post">
                    <h2>{post.title}</h2>
                    <div>{post.body}</div>
                    <div className="PostsList-Post-Author">{post.author.name}</div>
                </div>
            )
        })
    }

    const handleAddPost = () => {
        const newPost = {
            userId: 1,
            title: 'Here\'s the new post!',
            body: 'This is your new post. Isn\'t it great?'
        };

        createPost({ variables: { newPost } });
    };

    return (
        <div className="PostsList">
            <h1 className="PostsList-Title">I got this fake posts from GraphQl API !</h1>
            {renderPosts()}
            {(loading || newPost.loading) && <div>Loading...</div>}
            {(error || newPost.error) && <div>Sth bad happened! :( </div>}
            <button
                disabled={newPost.data || newPost.loading}
                onClick={handleAddPost}
                className="PostsList-Button"
            >Add random post</button>
        </div>
    );
}

export default PostsList;
