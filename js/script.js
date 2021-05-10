/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const studentCard = student =>{
   const { name, email, registered, picture } = student;
   // create new DOM elemnts
   // TODO: research-> why can't i set .className the same time the DOM object is created example:
   //       const document.createElement('li').className = 'student-item cf' ? 
   const li = document.createElement('li');
   const studentDetailsDiv = document.createElement('div');
   const joinedDetailsDiv = document.createElement('div');
   //for the rest we can just set innerHTML
   studentDetailsDiv.innerHTML = `
      <img class="avatar" src="${picture.large}" alt="Profile Picture">
      <h3>${name.first} ${name.last}</h3>
      <span class="email">${email}</span>
   `;
   joinedDetailsDiv.innerHTML = `<span class="date">Joined ${registered.date}</span>`

   // set class Names
   li.className = 'student-item cf';
   studentDetailsDiv.className = 'student-details';
   joinedDetailsDiv.className = 'joined-details';

   li.appendChild(studentDetailsDiv);
   li.appendChild(joinedDetailsDiv);

   return li;
}

const showPage = (list, page) =>{
   const itemsPerPage = 9;
   // assuming page > 0
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = (page * itemsPerPage); 
   
   const studentList = document.getElementsByClassName('student-list')[0];
   studentList.innerHTML = '' // remove students that may already be there;
   // TODO: setup conditions to handle edge cases
   for (let i = startIndex; i<endIndex && i<list.length; i++){
      console.log("student: " + JSON.stringify(list[i]));
      studentList.appendChild(studentCard(list[i]))
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const createPaginationHTMLButton = index =>{
   const li = document.createElement('li');
   const button = document.createElement('button');
   button.innerText = index;
   button.type = 'button';
   if(index == 1){
      button.className = 'active';
   }
   li.appendChild(button);
   return li;
}

const removeActiveClassNames = ul =>{
   for (li of ul.children){
      li.firstChild.className = ''
   }
}
const addPagination = list => {
   const numberOfPages = Math.ceil(list.length/9);
   const ul = document.getElementsByClassName('link-list')[0];
   // reset buttons and create new ones
   ul.innerHTML='';
   for(let i = 1; i<=numberOfPages; i++){
      ul.appendChild(createPaginationHTMLButton(i));
   }

   ul.addEventListener("click",(event)=>{
      if (event.target.nodeName == 'BUTTON'){
         //remove all active className from buttons
         removeActiveClassNames(ul);
         event.target.className = 'active';
         console.log(event.target)
         showPage(data,+event.target.innerText);
      }
   });
}
// Call functions
showPage(data, 1);
addPagination(data);
