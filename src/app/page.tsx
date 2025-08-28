import React from "react";

import { JSDOM } from "jsdom";

// Generic component
export default function Page() {
  const data = [
    {
      id: 1,
      html: `
        <button className="flex flex-col">
          <a href="https://www.google.com" style="flex-col">this is an anchor tag</a>
        </button>`,
    },
  ];

  const tagMap = {
    div: "container",
    p: "paragraph",
    span: "inline",
    button: "button",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
    ul: "list",
    li: "list-item",
    a: "link",
    table: "table",
    thead: "table-head",
    tbody: "table-body",
    tr: "table-row",
    td: "table-cell",
    th: "table-header",
    img: "image",
    input: "input",
    textarea: "textarea",
  };

  const attrsToCapture = [
    { name: "style", alterName: "style" },
    { name: "id", alterName: "id" },
    { name: "class", alterName: "style" },
    { name: "className", alterName: "style" },
    { name: "href", alterName: "link destination" },
    { name: "target", alterName: "target" },
    { name: "src", alterName: "src" },
    { name: "alt", alterName: "alt" },
    { name: "colspan", alterName: "colspan" },
    { name: "rowspan", alterName: "rowspan" },
    { name: "border", alterName: "border" },
  ];

  const reverseTagMap = Object.fromEntries(
    Object.entries(tagMap).map(([key, value]) => [value, key])
  );
  const reverseAttrsMap = Object.fromEntries(
    attrsToCapture.map(({ name, alterName }) => [alterName, name])
  );

  function htmlToJsonExtended(htmlString: any) {
    let doc;
    if (typeof window !== "undefined") {
      const parser = new DOMParser();
      doc = parser.parseFromString(htmlString, "text/html");
    } else {
      console.log("running");
      const dom = new JSDOM(htmlString);
      doc = dom.window.document;
    }

    const body = doc.body;

    function processNode(node: any) {
      const ELEMENT_NODE = 1;
      if (node.nodeType === ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        const obj = {
          type: (tagMap[tag] as any) || tag,
          content: "",
          style: {},
          children: [],
        };

        const elementChildren = Array.from(node.children);
        if (elementChildren.length === 0) {
          console.log("node", node);
          console.log(node.attributes.style);
          const text = node.textContent.trim();
          if (text) obj.content = text;
        } else {
          obj.children = elementChildren.map(processNode).filter(Boolean);
        }
        return obj;
      }
      return null;
    }

    return Array.from(body.children).map(processNode).filter(Boolean);
  }

  function jsonToHtmlExtended(jsonArray: any) {
    function styleObjectToString(styleObj: any) {
      return Object.entries(styleObj)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
    }

    function createNode(obj: any) {
      const tag = reverseTagMap[obj.type] || obj.type;

      let html = `<${tag}`;

      for (const [key, value] of Object.entries(obj)) {
        if (["type", "children", "content", "style"].includes(key)) continue;

        const htmlAttrName = reverseAttrsMap[key] || key;
        html += ` ${htmlAttrName}="${value}"`;
      }

      if (obj.style && Object.keys(obj.style).length > 0) {
        html += ` style="${styleObjectToString(obj.style)}"`;
      }

      html += ">";

      if (obj.content) {
        html += obj.content;
      }

      if (obj.children && obj.children.length > 0) {
        html += obj.children.map(createNode).join("");
      }

      html += `</${tag}>`;

      return html;
    }

    return jsonArray.map(createNode).join("");
  }

  const jsonResult = htmlToJsonExtended(data[0].html);
  console.log("Parsed JSON:", JSON.stringify(jsonResult, null, 2));

  const htmlResult = jsonToHtmlExtended(jsonResult);
  console.log("Reconstructed HTML:\n", htmlResult);

  return (
    <>
      <div>
        <h1>Hello</h1>
      </div>
    </>
  );
}
