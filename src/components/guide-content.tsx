import { Fragment, type ReactNode } from "react";
import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { CollapsibleBlock } from "@/components/collapsible-block";
import { CopyButton } from "@/components/copy-button";
import { ProgressCheckbox } from "@/components/progress-checkbox";
import { progressStoreForCheckbox } from "@/lib/guides";
import type { GuideId } from "@/types/course";

function hasClass(node: unknown, className: string): boolean {
  return (
    node instanceof Element &&
    (node.attribs.class ?? "").split(/\s+/).includes(className)
  );
}

function renderHeader(
  nodes: DOMNode[],
  options: HTMLReactParserOptions,
): ReactNode {
  const heading = nodes.find(
    (node) => node instanceof Element && /^h[1-6]$/.test(node.name),
  ) as Element | undefined;

  if (!heading) return domToReact(nodes, options);

  const remainder = nodes.filter((node) => node !== heading);
  return (
    <>
      <span className="collapsible-heading">
        {domToReact(heading.children as DOMNode[], options)}
      </span>
      {domToReact(remainder, options)}
    </>
  );
}

function createParserOptions(guideId: GuideId): HTMLReactParserOptions {
  const options: HTMLReactParserOptions = {};

  options.replace = (node, index) => {
    if (!(node instanceof Element)) return;

    if (hasClass(node, "copy-btn")) {
      return <CopyButton key={`copy-command-${index}`} kind="command" />;
    }
    if (hasClass(node, "copy-file-btn")) {
      return <CopyButton key={`copy-file-${index}`} kind="file" />;
    }

    if (node.name === "input" && node.attribs.id) {
      const store = progressStoreForCheckbox(node.attribs.id);
      if (store) {
        return (
          <ProgressCheckbox
            key={node.attribs.id}
            id={node.attribs.id}
            store={store}
          />
        );
      }
    }

    const isSection = hasClass(node, "section");
    const isPhase = hasClass(node, "setup-phase");
    if ((isSection || isPhase) && node.attribs.id) {
      const headerClass = isPhase ? "setup-phase-header" : "section-header";
      const contentClass = isPhase ? "phase-content" : "section-content";
      const header = node.children.find((child) => hasClass(child, headerClass));
      const content = node.children.find((child) => hasClass(child, contentClass));

      if (header instanceof Element && content instanceof Element) {
        const between = node.children.filter(
          (child) => child !== header && child !== content,
        ) as DOMNode[];

        return (
          <CollapsibleBlock
            key={node.attribs.id}
            id={node.attribs.id}
            className={node.attribs.class ?? (isPhase ? "setup-phase" : "section")}
            initialCollapsed={hasClass(node, "collapsed")}
            scope={guideId}
            kind={isPhase ? "phase" : "section"}
            header={renderHeader(header.children as DOMNode[], options)}
            between={domToReact(between, options)}
          >
            {domToReact(content.children as DOMNode[], options)}
          </CollapsibleBlock>
        );
      }
    }

    if (node.name === "pre") {
      return (
        <pre key={`pre-${index}`} tabIndex={0}>
          {domToReact(node.children as DOMNode[], options)}
        </pre>
      );
    }

    return;
  };

  return options;
}

export function GuideContent({
  guideId,
  html,
}: {
  guideId: GuideId;
  html: string;
}) {
  return <Fragment>{parse(html, createParserOptions(guideId))}</Fragment>;
}
