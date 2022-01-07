# Social-Site-Api

This API is deployed on heroku and for database it uses MONGODB Atlas.



**ROOT_URL**=(https://powerful-hamlet-85569.herokuapp.com/api/)


## For fetching posts(no authorization)(GET request)
<p>It supports pagination where you can fetch posts on a particular page and limit is the number of posts which should be displayed on single page</p>
<strong>URL</strong> =ROOT_URL + `/posts?page=${page}&limit=${limit}`


## For Signing Up(no authorization)(POST request)
Form Data
<ul>
  <li>name</li>
  <li>email</li>
  <li>paswword</li>
  <li>confirmpassword</li>
</ul>
<strong>URL</strong> =ROOT_URL + '/users/signup',


## For Edit of user profile(POST)(Authorization required) 
Form Data
<ul>
  <li>name</li>
  <li>id</li>
  <li>password</li>
  <li>confirmpassword</li>
</ul>
<strong>URL</strong>=ROOT_URL + '/users/edit',


## For fetching user profile(GET)(Authorization required)
<strong>URL</strong> =ROOT_URL + `/users/${id}`


## For fetching friends of user(GET)(Authorization required)
<strong>URL</strong> =ROOT_URL+'/friendship/fetch_user_friends'


## Add friend(POST)(Authorization required)
Query Params
<ul>
  <li>id(String)</li>
</ul>
<strong>URL</strong> =ROOT_URL + `/friendship/create_friendship?user_id=${id}`


## RemoveFriend(POST)(Autherization required)
Query params
<ul>
  <li>user_id(String)(id of user you want to remove as a friend)</li>
</ul>
<strong>URL</strong> =ROOT_URL + `/friendship/remove_friendship?user_id=${id}`


## For Adding a post(POST)(Autherization required)
Form Data
<ul>
  <li>content(String)</li>
</ul>
<strong>URL</strong> =ROOT_URL + '/posts/create'


## For creating a Comment(POST)(Autherization required)
Form body
Form Data
<ul>
  <li>post_id - String (id of the post you are creating a comment for)</li>
  <li>content - String</li>
</ul>
<strong>URL</strong>= ROOT_URL + '/comments'


## For Like/Dislike a post or comment(POST)(Autherization required)
Query params
<ul>
  <li>id - String (id of post/comment you want to like)</li>
  <li>type - String (either 'Post' or 'Comment')</li>
</ul>
<strong>URL</strong>=ROOT_URL + `/likes/toggle?id=${id}&type=${type}`


## For searching users with username(GET)(Autherization required)
Query params
<ul>
  <li>text - String (some substr of name of user to search)</li>
</ul>
<strong>URL</strong>=ROOT_URL + `/users/search?text=${text}`


#### In the requests which require authentication just paste the token generated on signin or signup in Authorization attribute in header
<strong>Authorization : Bearer {token}</strong>
