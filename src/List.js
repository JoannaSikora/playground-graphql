import {gql, useMutation, useQuery} from "@apollo/client";

const ALL_POSTS = gql`
 query AllPosts {
    posts {
        data {
            title
            id
        }
    }
  }
`;

const CREATE_POST = gql`
 mutation CreatePost($newPost: PostInput!) {
     addPost(data: $newPost) {
               id
                title
                body
                author {
                  id
                  name
                }
            }
  }
`;

const List = () => {
    const { data, loading, error } = useQuery(ALL_POSTS);
    const [createPost, newPost] = useMutation(CREATE_POST);

    const renderPosts = () => {
        return data?.posts.data.map(post => <div key={post.id}>{post.title}</div>)
    }

    const handleAddPost = () => {
        const newPost = {
            userId: 1,
            title: 'Here\'s the new post!',
            body: 'Isn\'t it great?'
        };

        createPost({ variables: { newPost } });
        console.log('adding post...');
    };

    return (
        <div>
            <h1>I got this fake posts from GraphQl API !</h1>
            {renderPosts()}
            {(loading || newPost.loading) && <div>Loading...</div>}
            {(error || newPost.error) && <div>Sth bad happened! :( </div>}
            <button onClick={handleAddPost}>Add a random post</button>
        </div>
    );
}

export default List;
