import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

export default function Dropdown({ id, label, value, options, onChange, disabled = false, placeholder = "Select" }) {
  const listId = useId();
  const trigger = useRef(null);
  const menu = useRef(null);
  const search = useRef({ text: "", at: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState({});
  const selected = options.findIndex((option) => String(option.value) === String(value));

  function show(index = selected < 0 ? 0 : selected) {
    if (disabled || !options.length) return;
    const rect = trigger.current.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom - 12;
    const above = rect.top - 12;
    const upwards = below < Math.min(options.length * 46 + 12, 280) && above > below;
    const width = Math.min(Math.max(rect.width, 180), window.innerWidth - 24);
    setPosition({
      width, left: Math.max(12, Math.min(rect.left, window.innerWidth - width - 12)),
      top: upwards ? undefined : rect.bottom + 6,
      bottom: upwards ? window.innerHeight - rect.top + 6 : undefined,
      maxHeight: Math.max(44, Math.min(280, upwards ? above : below)),
    });
    setActive(index);
    setOpen(true);
  }

  function choose(index) {
    if (!options[index] || disabled) return;
    onChange(String(options[index].value));
    setOpen(false);
    trigger.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const outside = (event) => {
      if (!trigger.current?.contains(event.target) && !menu.current?.contains(event.target)) setOpen(false);
    };
    const scroll = (event) => {
      if (!menu.current?.contains(event.target)) setOpen(false);
    };
    const resize = () => setOpen(false);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  useEffect(() => {
    if (open) menu.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function keyDown(event) {
    if (event.key === "Tab") { setOpen(false); return; }
    if (event.key === "Escape") { event.preventDefault(); setOpen(false); return; }
    if (!options.length) return;
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const index = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1
        : open ? (active + (event.key === "ArrowUp" ? -1 : 1) + options.length) % options.length
        : selected < 0 ? 0 : selected;
      if (open) setActive(index); else show(index);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active); else show();
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const now = Date.now();
      search.current = { text: (now - search.current.at < 700 ? search.current.text : "") + event.key.toLowerCase(), at: now };
      const index = options.findIndex((option) => option.label.toLowerCase().startsWith(search.current.text));
      if (index >= 0) { if (open) setActive(index); else show(index); }
    }
  }

  return <>
    <button ref={trigger} id={id} type="button" className="shelf-dropdown-trigger" role="combobox"
      aria-label={label} aria-expanded={open && !disabled} aria-haspopup="listbox" aria-controls={open ? listId : undefined}
      aria-activedescendant={open ? `${listId}-${active}` : undefined} disabled={disabled}
      onClick={() => open ? setOpen(false) : show()} onKeyDown={keyDown}
      onBlur={(event) => { if (!menu.current?.contains(event.relatedTarget)) setOpen(false); }}>
      <span className={selected < 0 ? "dropdown-placeholder" : ""}>{options[selected]?.label || placeholder}</span>
      <ChevronDown size={16} aria-hidden="true" className={open ? "rotate" : ""} />
    </button>
    {open && !disabled && createPortal(
      <div ref={menu} id={listId} className="shelf-dropdown-menu" role="listbox" aria-label={label} style={position}>
        {options.map((option, index) => <div key={option.value} id={`${listId}-${index}`} role="option"
          aria-selected={index === selected} className={`shelf-dropdown-option ${index === active ? "is-active" : ""}`}
          onPointerMove={() => setActive(index)} onPointerDown={(event) => event.preventDefault()} onClick={() => choose(index)}>
          <span>{option.label}</span>{index === selected && <Check size={16} aria-hidden="true" />}
        </div>)}
      </div>, document.body
    )}
  </>;
}
