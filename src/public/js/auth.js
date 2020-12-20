let editor;

Vue.createApp({
  updated() {
    if (this.showHint) {
      editor = ace.edit("editor");
      editor.setTheme("ace/theme/monokai");
      editor.setFontSize(14);
      editor.session.setMode("ace/mode/sql");
      editor.setReadOnly(true);
    }
    if (editor) {
      editor.setValue(
        `
SELECT * 
FROM users
WHERE email='${this.email}' AND password='${this.password}'      
LIMIT 1
    `,
        0
      );
    }
  },
  data() {
    return {
      email: "",
      password: "",
      isSafe: "unsafe",
      showHint: false,
      error: "",
    };
  },
  methods: {
    toggleHint() {
      this.showHint = !this.showHint;
    },
    handleSubmit() {
      const { email, password, isSafe } = this;
      fetch("/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isSafe }),
      }).then(async (res) => {
        if (res.status !== 200) {
          const parsedRes = await res.json();
          this.error = parsedRes.message;
        } else {
          window.location.href = "/";
          console.log(window.location.href);
        }
      });
    },
  },
}).mount("#app");
