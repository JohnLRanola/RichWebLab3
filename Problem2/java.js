const seconds$ = new rxjs.BehaviorSubject(0);
const minutes$ = new rxjs.BehaviorSubject(0);
const hours$ = new rxjs.BehaviorSubject(0);

seconds$.subscribe(seconds => {
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
});

minutes$.subscribe(minutes => {
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
});

hours$.subscribe(hours => {
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
});

document.getElementById('start').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hoursInput').value);
    const minutes = parseInt(document.getElementById('minutesInput').value);
    const seconds = parseInt(document.getElementById('secondsInput').value);

    hours$.next(hours);
    minutes$.next(minutes);
    seconds$.next(seconds);

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    const countdown$ = rxjs.interval(1000).pipe(rxjs.take(totalSeconds));

    countdown$.subscribe({
        next: () => {
            let currentSeconds = seconds$.value;
            let currentMinutes = minutes$.value;
            let currentHours = hours$.value;

            if (currentSeconds > 0) {
                seconds$.next(currentSeconds - 1);
            } else if (currentMinutes > 0) {
                minutes$.next(currentMinutes - 1);
                seconds$.next(59);
            } else if (currentHours > 0) {
                hours$.next(currentHours - 1);
                minutes$.next(59);
                seconds$.next(59);
            }
        },
        complete: () => {
            alert('Countdown completed');
        }
    });
});