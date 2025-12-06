
        const sections = document.querySelectorAll('section[id], footer[id]'); // Inclui o footer na lista de seções
        const navLinks = document.querySelectorAll('nav a');
        const navHeight = document.querySelector('nav').offsetHeight;

        function changeLinkState() {
            const scrollY = window.scrollY;
            let currentSectionId = 'home'; // Começa com 'home' como padrão

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 50; // Ajusta o topo com a altura da nav e um offset
                const sectionHeight = section.offsetHeight;

                // Verifica se a seção está visível na tela
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(`nav a[href="#${currentSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }

        // Initial check in case the page loads on a different section
        changeLinkState();

        window.addEventListener('scroll', changeLinkState);


        // Team Selector Logic
        document.addEventListener('DOMContentLoaded', () => {
            const teamData = [
                {
                    name: 'Artu',
                    role: 'Programador',
                    desc: 'Desenvolve a arquitetura de código e implementa as mecânicas centrais do jogo, garantindo performance e estabilidade.',
                    img: 'assets/img/artu.png',
                    socials: {
                        instagram: 'https://www.instagram.com/artu.nicore/',
                        portfolio: '#'
                    }
                },
                {
                    name: 'Ryry',
                    role: 'Game Designer',
                    desc: 'Responsável pela concepção da experiência de jogo, criando as regras, os níveis e os sistemas que tornam o jogo divertido e desafiador.',
                    img: 'assets/img/ryry.png',
                    socials: {
                        instagram: 'https://www.instagram.com/ryaniramos/',
                        portfolio: '#'
                    }
                },
                {
                    name: 'Diluck',
                    role: 'Programador',
                    desc: 'Especializado na programação da jogabilidade, dando vida aos personagens, inimigos e interações do jogador com o mundo do jogo.',
                    img: 'assets/img/diluck.png',
                    socials: {
                        instagram: 'https://www.instagram.com/di_luck_/',
                        portfolio: '#'
                    }
                },
                {
                    name: 'Hadu',
                    role: 'Ilustrador',
                    desc: 'Dá vida ao universo do jogo através de ilustrações, criando personagens, cenários e a identidade visual do projeto.',
                    img: 'assets/img/hadu.png',
                    socials: {
                        instagram: 'https://www.instagram.com/haduarts/',
                        portfolio: '#'
                    }
                },
                {
                    name: 'Victor',
                    role: 'Marketing',
                    desc: 'Cria as estratégias de comunicação e divulgação, conectando nossos jogos com a comunidade e o público.',
                    img: 'assets/img/victor.png',
                    socials: {
                        instagram: 'https://www.instagram.com/victor_frr.s/',
                        portfolio: '#'
                    }
                },
                {
                    name: 'Sander',
                    role: 'Modelador 3D',
                    desc: 'Constrói os personagens, objetos e cenários em três dimensões, transformando conceitos 2D em modelos 3D prontos para o jogo.',
                    img: 'assets/img/sander.png',
                    socials: {
                        instagram: 'https://www.instagram.com/ss.feitosaa/',
                        portfolio: '#'
                    }
                }
            ];

            const charactersContainer = document.getElementById('team-characters');
            const playerImg = document.querySelector('#team-player .player-img img');
            const playerName = document.getElementById('player-name');
            const playerRole = document.getElementById('player-role');
            const playerDesc = document.getElementById('player-desc');
            const playerSocials = document.getElementById('player-socials');

            let currentPlayerIndex = 0;

            function selectPlayer(index) {
                currentPlayerIndex = index;

                // Update active avatar
                document.querySelectorAll('.team-avatar').forEach((avatar, i) => {
                    avatar.classList.toggle('selected', i === index);
                });

                const selectedPlayer = teamData[index];

                // Update main display
                playerImg.src = selectedPlayer.img;
                playerImg.alt = selectedPlayer.name;
                playerName.textContent = selectedPlayer.name;

                // Update info panel
                playerRole.textContent = selectedPlayer.role;
                playerDesc.textContent = selectedPlayer.desc;
                
                // Update socials (simple example)
                playerSocials.innerHTML = `
                    <a href="${selectedPlayer.socials.instagram}" class="social-icon" aria-label="Instagram" target="_blank">
                        <svg viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,21.4H7.8C4.6,21.4 2,18.8 2,16.2V7.8A5.2,5.2 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path></svg>
                        <span class="tooltip">Instagram</span>
                    </a>
                    <a href="${selectedPlayer.socials.portfolio}" class="social-icon" aria-label="Portfolio" target="_blank">
                        <svg viewBox="0 0 1024 1024" class="icon"><path d="M488.1 414.7V303.4L300.9 428l83.6 55.8zm254.1 137.7v-79.8l-59.8 39.9zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm278 533c0 1.1-.1 2.1-.2 3.1 0 .4-.1.7-.2 1a14.16 14.16 0 0 1-.8 3.2c-.2.6-.4 1.2-.6 1.7-.2.4-.4.8-.5 1.2-.3.5-.5 1.1-.8 1.6-.2.4-.4.7-.7 1.1-.3.5-.7 1-1 1.5-.3.4-.5.7-.8 1-.4.4-.8.9-1.2 1.3-.3.3-.6.6-1 .9-.4.4-.9.8-1.4 1.1-.4.3-.7.6-1.1.8-.1.1-.3.2-.4.3L525.2 786c-4 2.7-8.6 4-13.2 4-4.7 0-9.3-1.4-13.3-4L244.6 616.9c-.1-.1-.3-.2-.4-.3l-1.1-.8c-.5-.4-.9-.7-1.3-1.1-.3-.3-.6-.6-1-.9-.4-.4-.8-.8-1.2-1.3a7 7 0 0 1-.8-1c-.4-.5-.7-1-1-1.5-.2-.4-.5-.7-.7-1.1-.3-.5-.6-1.1-.8-1.6-.2-.4-.4-.8-.5-1.2-.2-.6-.4-1.2-.6-1.7-.1-.4-.3-.8-.4-1.2-.2-.7-.3-1.3-.4-2-.1-.3-.1-.7-.2-1-.1-1-.2-2.1-.2-3.1V427.9c0-1 .1-2.1.2-3.1.1-.3.1-.7.2-1a14.16 14.16 0 0 1 .8-3.2c.2-.6.4-1.2.6-1.7.2-.4.4-.8.5-1.2.2-.5.5-1.1.8-1.6.2-.4.4-.7.7-1.1.6-.9 1.2-1.7 1.8-2.5.4-.4.8-.9 1.2-1.3.3-.3.6-.6 1-.9.4-.4.9-.8 1.3-1.1.4-.3.7-.6 1.1-.8.1-.1.3-.2.4-.3L498.7 239c8-5.3 18.5-5.3 26.5 0l254.1 169.1c.1.1.3.2.4.3l1.1.8 1.4 1.1c.3.3.6.6 1 .9.4.4.8.8 1.2 1.3.7.8 1.3 1.6 1.8 2.5.2.4.5.7.7 1.1.3.5.6 1 .8 1.6.2.4.4.8.5 1.2.2.6.4 1.2.6 1.7.1.4.3.8.4 1.2.2.7.3 1.3.4 2 .1.3.1.7.2 1 .1 1 .2 2.1.2 3.1V597zm-254.1 13.3v111.3L723.1 597l-83.6-55.8zM281.8 472.6v79.8l59.8-39.9zM512 456.1l-84.5 56.4 84.5 56.4 84.5-56.4zM723.1 428L535.9 303.4v111.3l103.6 69.1zM384.5 541.2L300.9 597l187.2 124.6V610.3l-103.6-69.1z"></path></svg>
                        <span class="tooltip">Portfólio</span>
                    </a>
                `;
            }

            // Create avatars
            teamData.forEach((member, index) => {
                const avatar = document.createElement('div');
                avatar.className = 'team-avatar';
                avatar.style.backgroundImage = `url(${member.img})`;
                avatar.addEventListener('click', () => selectPlayer(index));
                charactersContainer.appendChild(avatar);
            });

            // Initial selection
            selectPlayer(0);

            // Event Card Logic
            const eventData = [
                {
                    imgSrc: 'assets/img/eventos/oficinagodot.png',
                    imgAlt: 'Imagem do ministrante da oficina de godot',
                    title: 'Oficina de Godot',
                    date: '30/09/2025 - 03/10/2025',
                    description: 'Oficina de godot na semana gamedev2 ensinando a fazer um jogo endless runner',
                    link: 'https://www.instagram.com/p/DOog-wribRb/'
                },
                {
                    imgSrc: 'assets/img/eventos/oficinagamemaker.png',
                    imgAlt: 'Imagem dos participantes da oficina de gamemaker',
                    title: 'Oficina de GameMaker',
                    date: '30/09/2025 - 03/10/2025',
                    description: 'Ensinando a fazer jogos na plataforma gamemaker',
                    link: 'https://www.instagram.com/p/DOtB1K9jd1h/'
                },
                {
                    imgSrc: 'assets/img/eventos/vencedores.png',
                    imgAlt: 'Vencedores da gamejam da semana gamedev',
                    title: 'Vencedores da GameJam',
                    date: '03/10/2025',
                    description: 'Primeiro lugar na gamejam da semana gamedev2',
                    link: 'https://www.instagram.com/p/DPbybcoDeJw/?img_index=4'
                },
                {
                    imgSrc: 'assets/img/eventos/capayt.png',
                    imgAlt: 'Imagem de capa do vídeo de inscrição para o campus mobile',
                    title: 'Inscrição do Campus Mobile',
                    date: '09/11/2025',
                    description: 'Vídeo de inscrição para 14ª Edição do Campus Mobile',
                    link: 'https://www.youtube.com/watch?v=dbilKg4wuOE'
                }
            ];

            const eventsGrid = document.querySelector('#eventos .gallery-grid');

            eventData.forEach(event => {
                const card = document.createElement('div');
                card.className = 'gallery-item event-card';
                card.innerHTML = `
                    <img src="${event.imgSrc}" alt="${event.imgAlt}" class="event-image">
                    <div class="event-info">
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-date">${event.date}</p>
                        <p class="event-description">${event.description}</p>
                        <a href="${event.link}" class="event-link" target="_blank">
                            Mais informações
                        </a>
                    </div>
                `;
                // Insere o novo card antes do primeiro item existente (se houver)
                eventsGrid.insertBefore(card, eventsGrid.firstChild);
            });
        });