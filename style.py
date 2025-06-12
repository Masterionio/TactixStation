# style.py - Python styles/configuration generator (example for dynamic style generation)

class StyleConfig:
    def __init__(self):
        self.colors = {
            "background": "#0a0e23",
            "accent": "#1e90ff",
            "highlight": "#38b6ff",
            "text": "#c0c8e0",
        }
        self.font_family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"

    def generate_css_variables(self):
        css_vars = ":root {\n"
        for name, hex_color in self.colors.items():
            css_vars += f"  --{name}-color: {hex_color};\n"
        css_vars += f"  --font-family: {self.font_family};\n"
        css_vars += "}\n"
        return css_vars

    def save_css(self, filepath="dynamic_style.css"):
        css_content = self.generate_css_variables()
        with open(filepath, "w") as f:
            f.write(css_content)
        print(f"CSS variables saved to {filepath}")

if __name__ == "__main__":
    style = StyleConfig()
    style.save_css()
