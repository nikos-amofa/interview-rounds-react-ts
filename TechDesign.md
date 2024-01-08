# Reffie.me Take Home Interview - Tech Design

## Backend: API for roles list

Summary:

- Build a `get` API to return a list of roles

Description:

- The company has multiple roles to fill in
- The list of roles is required on the frontend/backend to match each candidate to specific role

Acceptance Criteria:

- The API request `get("/roles")` will return the list in the following format

```json
[
  {
    "id": "senior_frontend_developer",
    "title": "Senior Frontend Developer"
  },
  {
    "id": "senior_fullstack_developer",
    "title": "Senior FullStack Developer"
  },
  {
    "id": "junior_backend_developer",
    "title": "Junior Backend Developer"
  },
  {
    "id": "engineering_manager",
    "title": "Engineering Manager"
  },
  {
    "id": "frontend_developer_react",
    "title": "Frontend Developer (React)"
  }
]
```

## Frontend: Retrieve and store roles list into Redux

Summary:

- Retrieve all the possible roles list from backend and store it into Redux store as `roles`

Description:

- The backend provides API request `get("/roles")` to return the list of roles
- The full list will be retrieved and stored into Redux. It will be used to match the roles with `role_id` on the frontend side and reduce burden to the database query

Acceptance Criteria:

- Set up Redux store for `roles` (**built in MVP**)
- Retrieve the `roles` list from backend and store into Redux on initial page load. (**built in MVP**)

## Backend: API Candidate brief information

Summary:

- Build a `get` request API to return candidate brief information

Description:

- There's a header in the interview automation page
- The header includes candidate's profile picture, name, and role title the candidate applied for
- This API is to provide the information to the frontend

Acceptance Criteria:

- The request `get("/candidates/{id}/header")` will return the following data

```json
{
  "avatar_url": "url to the image file",
  "first_name": "Joe",
  "last_name": "Johnson",
  "role_id": 2
}
```

## Frontend: Build the the initial automation with header

Summary

- Prepare the initial automation page with header for candidate information

Description:

- This is the initla ticket for the automation page
- There should be the header with candidate profile picture, name, and the role candidate applied for(`Senior FullStack Developer`, `Junior Backend Developer`, `Engineering Manager`, etc.)
- The `roles` data stored in Redux can be used to get the role title from `role_id`

Acceptance Criteria:

- The automation page header should have candidate profile picture in circle. If the profile picture is not provided, candidate's name initials will be used instead, e.g. for `Alice John`, it will be `AJ`
- The automation page header should have candidate full name (**built in MVP**)
- The automation page header should have the role the canddate applied for (**built in MVP**)

## Backend: API for Interview Round List

Summary:

- Build a `get` API to return the list of interview rounds

Description:

- On initial visit of the automation page, the frontend should see the list of cards, each card for each round.
- Each card doesn't show any detailed information until it's expanded, so a list of brief information will be sent via this API.
- The fields to be returned in the list are `id, title, status, order, status_updated_at, fitting_role_ids`
- The field `status_updated_at` is used to store when the candidate passed/failed certain round
- The `fitting_role_ids` is an array of fitting role ids for current candidate, e.g. if a software engineer, the candidate can be a junior frontend developer, senior frontend developer, senior backend developer, etc. For the final interview round, it will be a `final_role_id` instead of `fitting_role_ids`
- The `status` column is an enum of the following 4 values

```sql
CREATE TYPE status AS ENUM ('LOCKED', 'UNLOCKED', 'PASSED', 'FAILED');
```

Acceptance Criteria:

- The `interview_round` table is in the following format
  - `id`: primary key
  - `candidate_id`: `user_id` of the candidate
  - `title`: title of the interview round
  - `status`: The status of the interview round
  - `status_updated_at`: The date when the status is updated.
  - `fitting_role_ids`: The role ids fitting the current candidate based on the interview round
  - `final_role_id`: The role id selected in the final interview round
  - `order`: number to order the round
- Confirm that list is sorted by round order
- The api should return data in the following format
- The API request `get("/candidates/{id}/interview_rounds")` will return the list of brief information about interview rounds for current candidate

### interview in progress

```json
[
  {
    "id": 1,
    "title": "Screening",
    "status": "PASSED",
    "status_updated_at": "2023-12-10T10:00:00.000Z",
    "fitting_role_ids": ["senior_frontend_developer", "senior_fullstack_developer"],
    "order": 1
  },
  {
    "id": 2,
    "title": "Round 1: Technical Interview",
    "status": "PASSED",
    "status_updated_at": "2023-12-12T10:00:00.000Z",
    "fitting_role_ids": ["senior_frontend_developer", "senior_fullstack_developer"],
    "order": 2
  },
  {
    "id": 3,
    "title": "Round 2: Cultural Interview",
    "status": "UNLOCKED",
    "status_updated_at": "2023-12-14T10:00:00.000Z",
    "fitting_role_ids": null,
    "order": 3
  },
  {
    "id": 4,
    "title": "Final Round: Cultural Interview",
    "status": "LOCKED",
    "status_updated_at": null,
    "final_role_id": null,
    "order": 4
  }
]
```

### candidate passed all interviews and has been selected

```json
[
  {
    "id": 1,
    "title": "Screening",
    "status": "PASSED",
    "status_updated_at": "2023-12-10T10:00:00.000Z",
    "fitting_role_ids": ["senior_frontend_developer", "senior_fullstack_developer"],
    "order": 1
  },
  {
    "id": 2,
    "title": "Round 1: Technical Interview",
    "status": "PASSED",
    "status_updated_at": "2023-12-12T10:00:00.000Z",
    "fitting_role_ids": ["senior_frontend_developer", "senior_fullstack_developer"],
    "order": 2
  },
  {
    "id": 3,
    "title": "Round 2: Cultural Interview",
    "status": "PASSED",
    "status_updated_at": "2023-12-14T10:00:00.000Z",
    "fitting_role_ids": ["senior_frontend_developer", "senior_fullstack_developer"],
    "order": 3
  }
  {
    "id": 4,
    "title": "Final Round: Cultural Interview",
    "status": "PASSED",
    "status_updated_at": "2023-12-16T10:00:00.000Z",
    "final_role_id": "senior_fullstack_developer",
    "order": 4
  }
]
```

### candidate failed

```json
[
  {
    "id": 1,
    "title": "Screening",
    "status": "PASSED",
    "status_updated_at": "2023-12-10T10:00:00.000Z",
    "fitting_role_ids": ["senior_frontend_developer", "senior_fullstack_developer"],
    "order": 1
  },
  {
    "id": 2,
    "title": "Round 1: Technical Interview",
    "status": "FAILED",
    "status_updated_at": "2023-12-12T10:00:00.000Z",
    "fitting_role_ids": null,
    "order": 2
  },
  {
    "id": 3,
    "title": "Round 2: Cultural Interview",
    "status": "UNLOCKED",
    "status_updated_at": null,
    "fitting_role_ids": null,
    "order": 3
  }
  {
    "id": 4,
    "title": "Final Round: Cultural Interview",
    "status": "UNLOCKED",
    "status_updated_at": null,
    "final_role_id": null,
    "order": 4
  }
]
```

## Backend: Return Question list

Summary:

- Provide the API to return questionnaire list searchable with keywords

Description:

- During interview, the interviewer will ask question to the interviewee and write notes about the interviewee's answer or interviewer's feedback
- The interviewer can prepare his/her own questions, but the interview questions can be prepared beforehand, this is the API to return the question list
- The question list request url will be `get("/interview/questions?keyword={keyword}")` format
- The response will be paginated with 10 questions per page
- When the keyword is empty, it should return all questions
- **Important**: Make sure to sort by `question_text`, so that the response is stable in the order
- Headless CMS can be used instead of database to store the question list

Acceptance Criteria:

- The API request `get("/interview/questions?keyword=React")` returns questions by the following format
- For simplicity, don't implement pagination in MVP

```json
{
  "total": 98,
  "page": 1,
  "page_size": 10,
  "results": [
    "What is React?",
    "What are the major features of React?",
    "What is JSX in React?",
    "What is the difference between Element and Componentin React?",
    "How to create components in React?",
    "When to use a Class Component over a Function Component in React?",
    "What are Pure Components in React?",
    "What is state in React?",
    "What are props in React?",
    "What is the difference between state and props in React?"
  ]
}
```

- When `keyword` is empty, it returns all question list
- When `keyword` is provided, it searches with the keyword from the question list

NOTE:

- The `question_id` is intentionally removed in the results
- In the table `question_answer`, the question text itself will be stored instead of `question_id`. This will be much human readable in the database

## Frontend: Automation Interview Round List and Card

Summary:

- Render automation interview round list in a brief card format

Description:

- The page will show the interview round list
- Consume the API `get("/candidates/{id}/interview_rounds")` to retrieve the data required (Reference ticket `Backend: API for Interview Round List` for the response data format)
- Each card shows the information based on the data retrieved via the API
- The card with status `PASSED, FAILED, UNLOCKED` can be expandable/collapsed by clicking the card to show the detailed information about it.
- Don't worry about the contents after expanding, it will be done via other ticket.

Acceptance Criteria:

- Render the interview round list (**built in MVP**)
- Each card should be expandable upon clicking if the `status` is one of `PASSED, FAILED, UNLOCKED` (**built in MVP**)
- Each card should include the following data
  - Interview round title: e.g. "Round 1: Technical Interview" (**built in MVP**)
  - Pass icon (green color, circle-check) if `PASSED` status OR fail icon (red color, circle-xmark) if `FAILED` status (**built in MVP**)
  - The date of status changed, if the status is one of `PASSED, FAILED, UNLOCKED`
  - The fitting roles for current candidate based on the interview, if the status is `PASSED`
- The card with status `UNLOCKED` will be disabled (**built in MVP**)

## Backend: API for Question and Answer list for certain interview round

Summary:

- Build an API to return the list of question/answer for certain interview round

Description:

- In each interview round, interviewers ask questions to the interviewee
- The question asked and interviewee's answers or interviewer's feedback are recorded
- This is to build the get API to return the list of question/answer

Acceptance Criteria:

- The `question_answer` table schema
  - `id`: primary key
  - `interview_round_id`: foreign key, `id` of the interview round
  - `interviewer_id`: foreign key, `id` of the interviewer's user_id
  - `question`: text of the question
  - `answer`: answer text
  - `created_at`
- The API `get("/interview_rounds/{id}/questions_answers")` will return the data in the following format
- It's sorted by the `created_at`
- The `interviewer_id` is the engineering manager or the hiring engineer's `user_id`

```json
[
  {
    "id": 1,
    "question": "What is React?",
    "answer": "blah blah blah",
    "interviewer": {
      "id": 1,
      "avatar_url": "https://image.png",
      "first_name": "Alice",
      "last_name": "Johnson"
    }
  },
  {
    "id": 2,
    "question": "What are the major features of React?",
    "answer": "blah blah blah",
    "interviewer": {
      "id": 10,
      "avatar_url": "https://image.png",
      "first_name": "Alice",
      "last_name": "Johnson"
    }
  },
  {
    "id": 3,
    "question": "What is JSX in React?",
    "answer": "blah blah blah",
    "interviewer": {
      "id": 4,
      "avatar_url": "https://image.png",
      "first_name": "Alice",
      "last_name": "Johnson"
    }
  }
]
```

## Backend: API to add question for certain interview round

Summary:

- Build API endpoints to add a question for certain interview round

Description:

- During the interview, an interviewer can ask a question
- This question can be one of the question list built by ticket `Backend: Return Question list` or a custom question made by the interviewer

Acceptance Criteria:

- The API endpoint is `post("/question_answer")`
- The request payload is in the following format

```json
{
  "interview_round_id": 1,
  "question": "What is React?"
}
```

- The interviewer's id can be retrieved from decrypting the JWT, session cookie, or other method depending on the user auth system of the backend
- Add a new record to the `question_answer` table
- The response payload is

```json
{
  "id": 1,
  "interview_round_id": 1,
  "interviewer_id": 1,
  "question": "What is React?",
  "answer": null,
  "created_at": "2023-12-20T10:00:00.000Z"
}
```

## Backend: API to update question/answer for a `questoin_answer` record

Summary:

- Build a patch API endpoint to update the question/answer, which is authorized by the creator

Description:

- The interviewer can change the question or answer, this API is for this purpose
- The API request will be `put("/question_answers/{id}")`
- The request should be authorized by the `interviewer_id` check of current user calling the request
- The request payload format

```json
{
  "question": "What are the major features of React?",
  "answer": "blah blah"
}
```

- It should update the record in the database
- The response payload format

```json
{
  "id": 1,
  "interview_round_id": 1,
  "interviewer_id": 1,
  "question": "What are the major features of React?",
  "answer": "blah blah",
  "created_at": "2023-12-20T10:00:00.000Z",
  "updated_at": "2023-12-21T10:00:00.000Z"
}
```

## Backend: API to delete question/answer

Summary: The API endpoint is `delete("/question_answers/{id}")`

## Frontend: Add Question button and modal

Summary:

- Implement a "Add a Questoin" button and modal to add a question for current interview round

Description:

- The interviewer can add a question
- The button shows up when the interview round card is expanded
- The interviewer clicks the button to open a modal and select the question or add his/her custom question

Acceptance Criteria:

- [x] After expanding the interview round card, the button "Add a Question" shows up
- [x] Clicking the button opens a modal with title "Add a Question"
- [x] Two blocks in the modal
  - Select a Question:
    - [x] The block title is "Select a Question"
    - [x] There's an input box with placeholder "Search Questoin" to type in the keyword to search questions
    - [x] Use debounce for search keyword typing
    - [x] Under the input box, there's a list of search results
    - [x] Use the API endpoint `get("/interview/questions?keyword=React")` and reference ticket `Backend: Return Question list`
    - There's a pagination for search results, but it'll be skipped for MVP
    - [x] Upon selecting a question, send API request to add the question. Use endpoint `post("/question_answer")` and reference ticket `Backend: API to add question for certain interview round`
    - [x] Upon successful response, close the modal and add the question to the question list in the interview round card
  - Custom Question:
    - This will be left for another ticket

NOTE:

- This modal will be modified later to edit question, so consider reusability of the component.

## Frontend: Custom Question in the Add Question modal

Summary:

- Enable adding a custom question in the Add Question modal

Description:

- Except pre-defined question list, the interviewer can ask his/her custom qusetions during interviews
- This is to enable the option for custom question

Acceptance Criteria:

- [x] In the Add Question Modal, under the "Select a Question" block, there's another block "Custom Question"
- [x] Below the title is an inputbox with placeholder "Write your custom question"
- [x] Next to the inputbox is a button "Add"
- [x] The button is disabled until any text is input in the inputbox
- [x] Upon clicking the Add button, send API request to add the question. Use endpoint `post("/question_answer")` and reference ticket `Backend: API to add question for certain interview round`
- [x] Upon successful response, close the modal and add the question to the question list in the interview round card

## Frontend: QA list in the interview round card

Summary:

- Render the QA list in the interview round card

Description:

- The list is placed above the "Add a Question" button
- Use the API endpoint `get("/interview_rounds/{id}/questions_answers")` and reference the ticket `Backend: API for Question and Answer list for certain interview round`

Acceptance Criteria:

- [x] Each QA item has the interviewer's profile picture
- [x] Next to the profile picture is the question text selected by the interviewer
- [x] Next to the question text, there're two icon buttons, `pencil`(Change) and `trash`(Delete), and `Save Answer` button
- [x] Under the line is a textarea to write the answers of the candidate or interviewer's feedback with placeholder "Candidate's answer or questioner's feedback"
- The buttons and textarea is enabled to the interviewer who created the question
- [x] Click `Save Answer` button to save the answer
- Upon clicking the icon button "Change", open the edit modal
- Upon clicking the icon button "Delete", open a confirmation modal and delete the question. Use the endpoint `delete("/question_answers/{id}")`

## Backend: API to update `status`, `fitting_role_ids`, and `final_role_id` of interview round

Description:

- API endpoint `put("/interview_rounds/{id}")`
- request payload

```json
{
  "status": "PASSED",
  "fitting_role_ids": ["senior_frontend_developer", "senior_fullstack_developer"]
}
```

OR

```json
{
  "status": "PASSED",
  "final_role_id": "senior_frontend_developer"
}
```

- Upon updating the `status` to `PASSED`, update the status of the next interview round to `UNLOCKED`

## Frontend: Roles list in the interview round card

Description:

- [x] Under the QA list, there's a selector for "Fitting roles" or "Final Role" for final interview round
- [x] The interviewer can select the fitting roles for current candidate
- [x] After select, click "Pass" button to pass
- [x] Or click "Fail" button to fail the user
- [x] Passing the current interview round should unlock the next interview round

---

---

# Consideration for vNext

1. Add discussion/comment feature for each interview round card, similar to Jira comment feature. This can be used to decider's final note why pass/fail the candidate
2. Upon clicking the Pass/Fail button, open email list for the decider to select email to the candidate with "Reply to" current user's email for the Pass/Fail email. This can make sure that the candidate is notified about the next step schedule or failed.
3. Only the authed decider among interviewers have enabled buttons "Pass" and "Fail"
4. When an interviewer mutates some data to the database, it should be notified OR updated to all interviewers working on the same automation page. This can be done via websocket or polling
   - notification: "Page content has been updated, please refresh the page to see the updated results!"
   - synchronozation: update the contents on the client-side
5. The fitting roles of the candidate can be added to the API endpoint `get("/interview/questions?keyword=React&fitting_roles=[senior_software_engineer,fullstack_engineer]")` so machine learning system can be used to suggest the questions
6. The questions by the endpoint above can be classified by the role, e.g. questions for software engineer, questions for engineering manager, etc.
