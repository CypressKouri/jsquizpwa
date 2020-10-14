const version = "v1";

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/quizproject.css",
        "/quizproject.js",
        "/quizimages/4.jpg",
        "/quizimages/5.jpg",
        "/quizimages/6.jpg",
        "/quizimages/7.jpg",
        "/quizimages/8.jpg",
        "/quizimages/9.jpg",
        "/quizimages/10.jpg",
        "/quizimages/11.jpg",
        "/quizimages/12.jpg",
        "/quizimages/41.jpg",
        "/quizimages/51.jpg",
        "/quizimages/61.jpg",
        "/quizimages/71.jpg",
        "/quizimages/81.jpg",
        "/quizimages/91.jpg",
        "/quizimages/101.jpg",
        "/quizimages/111.jpg",
        "/quizimages/121.jpg",
        "/quizimages/q1.jpg",
        "/quizimages/q2.jpg",
        "/quizimages/q3.jpg",
        "/quizimages/q4.jpg",
        "/quizimages/q5.jpg",
        "/quizimages/q6.jpg",
        "/quizimages/q7.jpg",
        "/quizimages/q8.jpg",
        "/quizimages/q9.jpg",
        "/quizimages/q10.jpg",
        "/quizimages/q11.jpg",
        "/quizimages/q12.jpg",
        "/notfound.txt"
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request)
          .then(function(response) {
            // response may be used only once
            // we need to save clone to put one copy in cache
            // and serve second one
            let responseClone = response.clone();

            caches.open(version).then(function(cache) {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(function() {
            return caches.match("/notfound.txt");
          });
      }
    })
  );
});
