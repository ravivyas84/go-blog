document.addEventListener('DOMContentLoaded', function () {
  var articleContent = document.getElementById('article-content');
  if (!articleContent) return;

  wrapSections(articleContent);
  hideDuplicatedHeroImage(articleContent);
  insertReadingDivider(articleContent);
  setupToc(articleContent);
});

function wrapSections(articleContent) {
  if (articleContent.querySelector('.post-section')) return;

  var children = Array.from(articleContent.children);
  var fragment = document.createDocumentFragment();
  var currentSection = null;

  children.forEach(function (child) {
    if (child.tagName === 'H2') {
      currentSection = document.createElement('section');
      currentSection.className = 'post-section';
      fragment.appendChild(currentSection);
      currentSection.appendChild(child);
      return;
    }

    if (currentSection) {
      currentSection.appendChild(child);
      return;
    }

    fragment.appendChild(child);
  });

  articleContent.innerHTML = '';
  articleContent.appendChild(fragment);
}

function hideDuplicatedHeroImage(articleContent) {
  var heroSource = articleContent.dataset.heroSource;
  if (!heroSource) return;

  var duplicate = articleContent.querySelector('img[src="' + heroSource + '"]');
  if (duplicate) {
    duplicate.closest('p') ? (duplicate.closest('p').style.display = 'none') : (duplicate.style.display = 'none');
  }
}

function insertReadingDivider(articleContent) {
  var sections = articleContent.querySelectorAll('.post-section');
  if (sections.length < 2 || articleContent.querySelector('.post-reading-divider')) return;

  var divider = document.createElement('div');
  divider.className = 'post-reading-divider';

  var nextHeading = sections[1].querySelector('h2[id]');
  var nextId = nextHeading ? nextHeading.id : '';

  divider.innerHTML =
    '<a class="post-reading-divider__link" href="#' +
    nextId +
    '">Keep reading <span aria-hidden="true">→</span></a>' +
    '<p class="post-reading-divider__hint">Or jump to a section from the sidebar.</p>';

  if (nextId) {
    divider.querySelector('a').addEventListener('click', function (event) {
      event.preventDefault();
      var target = document.getElementById(nextId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  sections[0].after(divider);
}

function setupToc(articleContent) {
  var headings = articleContent.querySelectorAll('h2[id]');
  var links = document.querySelectorAll('.post-toc-link');
  if (!headings.length || !links.length) return;

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;

      var target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        links.forEach(function (link) {
          link.classList.toggle('post-toc-link--active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    },
    {
      rootMargin: '-15% 0px -70% 0px',
    },
  );

  headings.forEach(function (heading) {
    observer.observe(heading);
  });
}
