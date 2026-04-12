async function loadSharedSection(targetId, filePath) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    target.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function setupSharedHeaderFooter() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navShell = document.getElementById("navShell");
  const dropdowns = document.querySelectorAll(".dropdown");
  const backToTop = document.getElementById("backToTop");

  if (mobileToggle && navShell) {
    mobileToggle.addEventListener("click", () => {
      navShell.classList.toggle("open");
    });
  }

  dropdowns.forEach(drop => {
    const btn = drop.querySelector(".drop-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          drop.classList.toggle("open");
        }
      });
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

async function initSharedLayout() {
  await loadSharedSection("site-header", "header.html");
  await loadSharedSection("site-footer", "footer.html");
  setupSharedHeaderFooter();
}

document.addEventListener("DOMContentLoaded", initSharedLayout);
