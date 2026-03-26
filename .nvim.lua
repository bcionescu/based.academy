-- Neovim project-local config — requires `vim.o.exrc = true` in your config.

-- Web files: 2-space indent, convert tabs to spaces.
vim.api.nvim_create_autocmd("FileType", {
  pattern = { "html", "css", "xml", "json", "markdown", "yaml", "lua" },
  callback = function()
    vim.bo.tabstop = 2
    vim.bo.shiftwidth = 2
    vim.bo.softtabstop = 2
    vim.bo.expandtab = true
  end,
})

-- Makefiles: tabs required by Make syntax.
vim.api.nvim_create_autocmd("FileType", {
  pattern = { "make" },
  callback = function()
    vim.bo.expandtab = false
    vim.bo.tabstop = 8
    vim.bo.shiftwidth = 8
    vim.bo.softtabstop = 0
  end,
})

-- html_indent_autotags lists tags whose CHILDREN are NOT indented (children
-- stay at the parent's indent level). The default "html,head,body" flattens
-- everything to 0sp. Setting it to just "html" means:
--
--   <html>         0sp (root)
--   <head>         0sp (child of autotag <html> → not indented)
--     <meta>       2sp (child of <head>, which is NOT an autotag → indented)
--   </head>        0sp
--   <body>         0sp (child of autotag <html> → not indented)
--     <header>     2sp (child of <body>, which is NOT an autotag → indented)
--   </body>        0sp
--   </html>        0sp
vim.g.html_indent_autotags = "html"
