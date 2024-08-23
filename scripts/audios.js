document
                .getElementById("playButton")
                .addEventListener("click", function () {
                    const audio = document.getElementById("audioPlayer");
                    const playButton = this;

                    if (audio.paused) {
                        audio.play();
                        playButton
                            .querySelector("i")
                            .classList.remove("fa-play");
                        playButton.querySelector("i").classList.add("fa-pause");
                        document.querySelectorAll(".bar").forEach((bar) => {
                            bar.style.animationPlayState = "running";
                        });
                    } else {
                        audio.pause();
                        playButton
                            .querySelector("i")
                            .classList.remove("fa-pause");
                        playButton.querySelector("i").classList.add("fa-play");
                        document.querySelectorAll(".bar").forEach((bar) => {
                            bar.style.animationPlayState = "paused";
                        });
                    }
                });

            document
                .getElementById("audioPlayer")
                .addEventListener("ended", function () {
                    const playButton = document.getElementById("playButton");
                    playButton.querySelector("i").classList.remove("fa-pause");
                    playButton.querySelector("i").classList.add("fa-play");
                    document.querySelectorAll(".bar").forEach((bar) => {
                        bar.style.animationPlayState = "paused";
                    });
                });

            const audio = document.getElementById("audioPlayer");
            const seekBar = document.getElementById("seekBar");

            // Update seek bar as the audio plays
            audio.addEventListener("timeupdate", function () {
                const currentTime = audio.currentTime;
                const duration = audio.duration;
                seekBar.value = (currentTime / duration) * 100;
            });

            // Seek to a new time in the audio when the seek bar changes
            seekBar.addEventListener("input", function () {
                const duration = audio.duration;
                audio.currentTime = (seekBar.value / 100) * duration;
            });