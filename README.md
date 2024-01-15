# 1. Introduction to HTML

HTML, or HyperText Markup Language, is the backbone of web development. It provides the structure for web pages and is a cornerstone technology alongside CSS and JavaScript. This document aims to provide a detailed understanding of how HTML works.

# 2. HTML Basics

## 2.1 Document Structure

An HTML document consists of several key components:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
```

- `<!DOCTYPE html>` defines the document type.
- `<html>` is the root element.
- `<head>` contains meta-information.
- `<body>` contains the actual content.

## 2.2 Elements and Tags

HTML uses elements enclosed in tags. Tags define the beginning and end of an element. For example:

```html
<p>This is a paragraph.</p>
```

Here, `<p>` is the opening tag, and `</p>` is the closing tag.

# 3. Headings and Text

HTML provides six levels of headings, from `<h1>` to `<h6`. Paragraphs are created using the `<p>` tag.

```html
<h1>Heading Level 1</h1>
<p>This is a paragraph of text.</p>
```

# 4. Lists

HTML supports ordered and unordered lists:

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<ol>
    <li>Item 1</li>
    <li>Item 2</li>
</ol>
```

# 5. Links

Links are created with the `<a>` tag:

```html
<a href="https://www.example.com">Visit Example.com</a>
```

# 6. Images

Images are added using the `<img>` tag:

```html
<img src="image.jpg" alt="Description">
```

# 7. Forms

HTML forms allow user input:

```html
<form action="/submit" method="post">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">

    <label for="password">Password:</label>
    <input type="password" id="password" name="password">

    <input type="submit" value="Submit">
</form>
```

# 8. HTML Semantic Elements

Semantic elements provide meaning to the document structure:

- `<header>`
- `<nav>`
- `<main>`
- `<article>`
- `<section>`
- `<aside>`
- `<footer>`

# 9. Conclusion

This document provides a foundational understanding of HTML. As you explore further, you'll discover additional HTML elements and features that enhance the presentation and functionality of web pages.