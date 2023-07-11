# Interactive Articles

### Project Overview

I've implemented this project to serve as the admin panel for someone who creates interactive articles for students. From the home page, the user can create, edit, preview, and delete articles. In the editor view (this is the advanced feature I chose to implement), they have control over creating markdown/MCQ blocks, re-ordering them as desired, and previewing what the published article would look like on a student's end. The MCQ Block is also implemented in a generalized way so it can be used for true/false questions, or even multiple choice questions with varying numbers of choices. The user is able to preview individual markdown blocks in the editor view so they aren't forced to jump back and forth between the preview and the editor. The user can also save an article that's still a work in progress (they're prompted to save unsaved changes through a UI message).

### Hosted demo

https://interactive-articles.vercel.app/

For the purpose of the hosted demo, I've already included a sample article that you can preview, edit, or delete.

### Running locally

1. Clone the repository
2. Run `npm install` in the root directory.
3. Run `npm start`.
4. Go to localhost:3000 in a browser tab.
