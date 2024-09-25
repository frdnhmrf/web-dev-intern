const apiUrl = "https://gist.githubusercontent.com/asharijuang/23745f3132fa30e666db68d2bf574e4a/raw/5d556dbb9c2aea9fdf3e1ec96e45f62a88cea7b6/chat_response.json";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const chatList = document.getElementById('chatList');
        const chatRooms = data.results;

        chatList.innerHTML = '';

        chatRooms.forEach(roomData => {
            const room = roomData.room;
            const participantsNames = room.participant ? room.participant.map(participant => participant.name).join(', ') : 'No participants';

            const chatItem = `
                <a href="#" class="list-group-item list-group-item-action border-0">
                    <div class="d-flex align-items-start">
                        <img src="${room.image_url}" class="rounded-circle mr-1" alt="${room.name}" width="60" height="50">
                        <div class="flex-grow-1 ml-3">
                            <strong>${room.name}</strong>
                            <div class="small">${participantsNames}</div>
                        </div>
                    </div>
                </a>
            `;

            chatList.innerHTML += chatItem;

        });
    })
    .catch(error => console.error('Error fetching chat data:', error));


fetch('chat_response.json')
    .then(response => response.json())
    .then(data => {
        const chatMessages = document.querySelector('.chat-messages');
        const comments = data.results[0].comments;

        comments.forEach(comment => {
            let messageHTML = '';

            const messageClass = (comment.sender === 'agent@mail.com') ? 'chat-message-right' : 'chat-message-left';
            const paddingClass = (comment.sender === 'agent@mail.com') ? 'mr-3' : 'ml-3';
            const imageSrc = (comment.sender === 'agent@mail.com') ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqzvOz-G3CRfE0feTjws2uPWWpQE-0TIHoSOKDDZH6PwfJ1P7OTE07OsUS-kpBD_RXbpo&usqp=CAU' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqaPZ6HpmxExPx5g_Rxgp8o0vPAdSCZcxMQ&s';

            if (comment.type === 'text') {
                messageHTML = `
          <div class="${messageClass} pb-4">
            <div>
              <img src="${imageSrc}" class="rounded-circle mr-1" alt="${comment.sender}" width="40" height="40">
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ${paddingClass}">
              <div class="font-weight-bold mb-1">${comment.sender}</div>
              ${comment.message}
            </div>
          </div>
        `;
            } else if (comment.type === 'image') {
                messageHTML = `
          <div class="${messageClass} pb-4">
            <div>
              <img src="${imageSrc}" class="rounded-circle mr-1" alt="${comment.sender}" width="40" height="40">
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ${paddingClass}">
              <div class="font-weight-bold mb-1">${comment.sender}</div>
              <img src="${comment.message}" alt="Image">
            </div>
          </div>
        `;
            } else if (comment.type === 'video') {
                messageHTML = `
        <div class="${messageClass} pb-4">
            <div>
            <img src="${imageSrc}" class="rounded-circle mr-1" alt="${comment.sender}" width="40" height="40">
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ${paddingClass}">
            <div class="font-weight-bold mb-1">${comment.sender}</div>
            <video controls width="400" height="300">
                <source src="${comment.message}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            </div>
        </div>
        `;
            } else if (comment.type === 'pdf') {
                messageHTML = `
          <div class="${messageClass} pb-4">
            <div>
              <img src="${imageSrc}" class="rounded-circle mr-1" alt="${comment.sender}" width="40" height="40">
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
              <div class="font-weight-bold mb-1">${comment.sender}</div>
              <a href="${comment.message}" target="_blank">Download PDF</a>
            </div>
          </div>
        `;
            }

            chatMessages.innerHTML += messageHTML;
        });
    })
    .catch(error => console.log(error));



fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const room = data.results[0].room;
        const headerSection = document.getElementById('header-messages');

        const headerHTML = `
            <div class="d-flex align-items-center py-1">
                <div class="position-relative">
                    <img src="${room.image_url}" class="rounded-circle mr-1" alt="${room.name}" width="40" height="40">
                </div>
                <div class="flex-grow-1 pl-3">
                    <strong>${room.name}</strong>
                </div>
                <div>
                    <button class="btn btn-light border btn-lg px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="feather feather-more-horizontal feather-lg">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Mengganti konten header secara dinamis dengan data dari JSON
        headerSection.innerHTML = headerHTML;
    })
    .catch(error => console.error('Error fetching room data:', error));
