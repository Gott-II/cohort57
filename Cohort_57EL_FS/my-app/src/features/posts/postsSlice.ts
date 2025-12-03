import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type PostsState from './types/PostsState'
import * as api from './api'

const initialState: PostsState = {
  posts: [],
  filtered: [],
  loading: false,
  error: "",
}

export const loadPosts = createAsyncThunk('posts/loadPosts', () => api.getAll())
export const loadPostsByWord = createAsyncThunk('posts/loadPostsByWord', (word: string) => 
    api.getPostsByWord(word)
)
export const editTitle = createAsyncThunk(
  "posts/editTitle",
  ({ title, id }: { title: string; id: number }) => api.editPostTitle(title, id)
)

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loading = true
        state.error = ""
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload.posts
        state.filtered = action.payload.posts
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load posts"
      })
      .addCase(editTitle.fulfilled, (state, action) => {
        state.posts = state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
        state.filtered = state.filtered.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
      })
      .addCase(loadPostsByWord.fulfilled, (state, action) => {
        state.filtered = action.payload.posts
      })
  },
})

export default postsSlice.reducer
