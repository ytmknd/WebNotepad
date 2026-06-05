(() => {
  const editor = document.getElementById("editor");
  const windowTitle = document.getElementById("windowTitle");
  const lineCol = document.getElementById("lineCol");
  const statusBar = document.getElementById("statusBar");
  const statusText = document.getElementById("statusText");
  const localFileInput = document.getElementById("localFileInput");
  const menuPopup = document.getElementById("menuPopup");
  const tabContextPopup = document.getElementById("tabContextPopup");
  const menuButtons = [...document.querySelectorAll(".menu-item")];
  const tabList = document.getElementById("tabList");
  const newTabBtn = document.getElementById("newTabBtn");
  const locale = (navigator.language || "").toLowerCase().startsWith("ja") ? "ja" : "en";
  const runtimeConfig = window.WEB_NOTEPAD_CONFIG || {};

  const MESSAGES = {
    ja: {
      appName: "Web メモ帳",
      untitled: "無題",
      menuFile: "ファイル",
      menuEdit: "編集",
      menuFormat: "書式",
      menuView: "表示",
      menuHelp: "ヘルプ",
      charCount: "{count} 文字",
      textFormat: "テキスト",
      settingsTitle: "設定",
      settingsFont: "フォント",
      settingsFontFamily: "フォント ファミリー",
      settingsFontSize: "サイズ",
      fileNew: "新規\tCtrl+N",
      fileNewTab: "新しいタブ\tCtrl+T",
      fileCloseTab: "タブを閉じる\tCtrl+W",
      tabClose: "タブを閉じる",
      tabCloseOthers: "他のタブを閉じる",
      tabCloseRight: "右側のタブを閉じる",
      tabReopenClosed: "閉じたタブを再度開く",
      fileOpen: "開く...\tCtrl+O",
      fileSave: "保存\tCtrl+S",
      fileSaveAs: "名前を付けて保存...",
      fileDriveConfig: "Google Drive 設定",
      fileDriveOpen: "Google Drive から開く",
      fileDriveSave: "Google Drive に保存",
      fileExit: "終了",
      editUndo: "元に戻す\tCtrl+Z",
      editCut: "切り取り\tCtrl+X",
      editCopy: "コピー\tCtrl+C",
      editPaste: "貼り付け\tCtrl+V",
      editDelete: "削除\tDel",
      editFind: "検索...\tCtrl+F",
      editFindNext: "次を検索\tF3",
      editReplace: "置換...\tCtrl+H",
      editGoTo: "行へ移動...\tCtrl+G",
      editSelectAll: "すべて選択\tCtrl+A",
      editDateTime: "日時の挿入\tF5",
      formatWordWrap: "右端で折り返す",
      viewStatusBar: "ステータス バー",
      helpInstall: "アプリをインストール",
      helpAbout: "バージョン情報",
      statusSaved: "保存しました",
      statusInstallDone: "アプリをインストールしました",
      statusInstallReady: "メニューの『ヘルプ > アプリをインストール』からインストールできます",
      statusAppInstalled: "Web メモ帳がインストールされました",
      statusDriveLoaded: "Google Drive から読み込みました",
      statusDriveSaved: "Google Drive に保存しました",
      statusDriveAutoConfigured: "Chromebook向けにGoogle Drive設定を自動適用しました",
      confirmDiscard: "未保存の変更があります。破棄して続行しますか?",
      confirmCloseTab: "このタブには未保存の変更があります。閉じますか?",
      unsavedTitle: "未保存の変更",
      unsavedMessage: "このタブには未保存の変更があります。",
      unsavedMessageNamed: "{name} には未保存の変更があります。",
      unsavedSave: "保存",
      unsavedDiscard: "保存しない",
      saveFailed: "保存に失敗しました: {error}",
      searchNotFound: "検索文字列が見つかりませんでした。",
      oauthClientRequired: "OAuth Client ID を入力してください。",
      driveConfigSaved: "Google Drive 設定を保存しました。",
      gisLoadFailed: "Google Identity Services の読み込みに失敗しました。通信環境を確認してください。",
      driveOpenFailed: "Google Drive から開けませんでした: {error}",
      driveSaveFailed: "Google Drive 保存に失敗しました: {error}",
      driveConfigIncomplete: "Google Drive 設定が未完了です。",
      installFallback: "このページをPWAとしてインストールするには、Chromeのメニューから『アプリをインストール』を選択してください。",
      cursor: "行 {line}、列 {col}",
      findTitle: "検索",
      findLabel: "検索する文字列:",
      findNext: "次を検索",
      replaceTitle: "置換",
      replaceFindLabel: "検索する文字列:",
      replaceToLabel: "置換後の文字列:",
      replaceOne: "置換",
      replaceAll: "すべて置換",
      goToTitle: "指定行へ移動",
      goToLabel: "行番号:",
      goToBtn: "移動",
      cancel: "キャンセル",
      aboutTitle: "バージョン情報",
      aboutName: "Web メモ帳",
      aboutDesc: "Windows メモ帳風 UI のブラウザ版テキストエディタです。",
      ok: "OK",
      driveConfigTitle: "Google Drive 設定",
      driveConfigHint: "Google Cloud で発行した OAuth クライアントIDを入力してください。",
      save: "保存",
      driveFileTitle: "Google Drive から開く",
      close: "閉じる",
      driveFileNotFound: "テキストファイルが見つかりません。",
      driveFileOpen: "開く"
    },
    en: {
      appName: "Web Notepad",
      untitled: "Untitled",
      menuFile: "File",
      menuEdit: "Edit",
      menuFormat: "Format",
      menuView: "View",
      menuHelp: "Help",
      charCount: "{count} characters",
      textFormat: "Text",
      settingsTitle: "Settings",
      settingsFont: "Font",
      settingsFontFamily: "Font family",
      settingsFontSize: "Size",
      fileNew: "New\tCtrl+N",
      fileNewTab: "New Tab\tCtrl+T",
      fileCloseTab: "Close Tab\tCtrl+W",
      tabClose: "Close tab",
      tabCloseOthers: "Close other tabs",
      tabCloseRight: "Close tabs to the right",
      tabReopenClosed: "Reopen closed tab",
      fileOpen: "Open...\tCtrl+O",
      fileSave: "Save\tCtrl+S",
      fileSaveAs: "Save As...",
      fileDriveConfig: "Google Drive Settings",
      fileDriveOpen: "Open from Google Drive",
      fileDriveSave: "Save to Google Drive",
      fileExit: "Exit",
      editUndo: "Undo\tCtrl+Z",
      editCut: "Cut\tCtrl+X",
      editCopy: "Copy\tCtrl+C",
      editPaste: "Paste\tCtrl+V",
      editDelete: "Delete\tDel",
      editFind: "Find...\tCtrl+F",
      editFindNext: "Find Next\tF3",
      editReplace: "Replace...\tCtrl+H",
      editGoTo: "Go To...\tCtrl+G",
      editSelectAll: "Select All\tCtrl+A",
      editDateTime: "Time/Date\tF5",
      formatWordWrap: "Word Wrap",
      viewStatusBar: "Status Bar",
      helpInstall: "Install App",
      helpAbout: "About",
      statusSaved: "Saved",
      statusInstallDone: "App installed",
      statusInstallReady: "Install is available from Help > Install App",
      statusAppInstalled: "Web Notepad was installed",
      statusDriveLoaded: "Loaded from Google Drive",
      statusDriveSaved: "Saved to Google Drive",
      statusDriveAutoConfigured: "Applied Google Drive settings automatically for Chromebook",
      confirmDiscard: "You have unsaved changes. Discard and continue?",
      confirmCloseTab: "This tab has unsaved changes. Close it anyway?",
      unsavedTitle: "Unsaved changes",
      unsavedMessage: "This tab has unsaved changes.",
      unsavedMessageNamed: "{name} has unsaved changes.",
      unsavedSave: "Save",
      unsavedDiscard: "Don't Save",
      saveFailed: "Failed to save: {error}",
      searchNotFound: "Search text was not found.",
      oauthClientRequired: "Please enter an OAuth Client ID.",
      driveConfigSaved: "Google Drive settings were saved.",
      gisLoadFailed: "Failed to load Google Identity Services. Please check your network.",
      driveOpenFailed: "Failed to open from Google Drive: {error}",
      driveSaveFailed: "Failed to save to Google Drive: {error}",
      driveConfigIncomplete: "Google Drive setup is not completed.",
      installFallback: "To install this page as a PWA, choose Install app from the Chrome menu.",
      cursor: "Ln {line}, Col {col}",
      findTitle: "Find",
      findLabel: "Find what:",
      findNext: "Find Next",
      replaceTitle: "Replace",
      replaceFindLabel: "Find what:",
      replaceToLabel: "Replace with:",
      replaceOne: "Replace",
      replaceAll: "Replace All",
      goToTitle: "Go To Line",
      goToLabel: "Line number:",
      goToBtn: "Go To",
      cancel: "Cancel",
      aboutTitle: "About",
      aboutName: "Web Notepad",
      aboutDesc: "A browser text editor with a Windows Notepad-like UI.",
      ok: "OK",
      driveConfigTitle: "Google Drive Settings",
      driveConfigHint: "Enter the OAuth Client ID issued in Google Cloud.",
      save: "Save",
      driveFileTitle: "Open from Google Drive",
      close: "Close",
      driveFileNotFound: "No text files were found.",
      driveFileOpen: "Open"
    }
  };

  function t(key, vars = {}) {
    const template = MESSAGES[locale][key] || MESSAGES.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
  }

  const dialogs = {
    find: document.getElementById("findDialog"),
    replace: document.getElementById("replaceDialog"),
    goTo: document.getElementById("goToDialog"),
    unsaved: document.getElementById("unsavedDialog"),
    about: document.getElementById("aboutDialog"),
    driveConfig: document.getElementById("driveConfigDialog"),
    driveFile: document.getElementById("driveFileDialog"),
    settings: document.getElementById("settingsDialog")
  };

  const SESSION_STORAGE_KEY = "web-notepad.session.v1";
  const SETTINGS_STORAGE_KEY = "web-notepad.settings.v1";
  const DEFAULT_FONT_FAMILY = '"Cascadia Mono", Consolas, "Lucida Console", monospace';
  const DEFAULT_FONT_SIZE = 15;

  const state = {
    wordWrap: false,
    statusBarVisible: true,
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: DEFAULT_FONT_SIZE,
    tabs: [],
    activeTabId: null,
    closedTabs: [],
    draggedTabId: null,
    driveClientId: localStorage.getItem("web-notepad.driveClientId") || "",
    driveToken: null,
    tokenClient: null,
    latestFindIndex: -1,
    deferredInstallPrompt: null
  };

  function createTab(initial = {}) {
    return {
      id: initial.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      fileName: initial.fileName || t("untitled"),
      text: initial.text || "",
      textChanged: Boolean(initial.textChanged),
      selectionStart: Number(initial.selectionStart || 0),
      selectionEnd: Number(initial.selectionEnd || 0),
      scrollTop: Number(initial.scrollTop || 0),
      localFileHandle: initial.localFileHandle || null,
      driveFileId: initial.driveFileId || null
    };
  }

  function persistSession() {
    try {
      const data = {
        activeTabId: state.activeTabId,
        tabs: state.tabs.map((tab) => ({
          id: tab.id,
          fileName: tab.fileName,
          text: tab.text,
          textChanged: tab.textChanged,
          selectionStart: tab.selectionStart,
          selectionEnd: tab.selectionEnd,
          scrollTop: tab.scrollTop,
          driveFileId: tab.driveFileId
        }))
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota errors and private mode restrictions.
    }
  }

  function restoreSession() {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) {
        return false;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.tabs) || parsed.tabs.length === 0) {
        return false;
      }

      state.tabs = parsed.tabs.map((tab) =>
        createTab({
          id: tab.id,
          fileName: typeof tab.fileName === "string" && tab.fileName ? tab.fileName : t("untitled"),
          text: typeof tab.text === "string" ? tab.text : "",
          textChanged: Boolean(tab.textChanged),
          selectionStart: Number(tab.selectionStart || 0),
          selectionEnd: Number(tab.selectionEnd || 0),
          scrollTop: Number(tab.scrollTop || 0),
          driveFileId: tab.driveFileId || null
        })
      );

      const restoredActive = parsed.activeTabId;
      const hasActive = state.tabs.some((tab) => tab.id === restoredActive);
      state.activeTabId = hasActive ? restoredActive : state.tabs[0].id;
      return true;
    } catch {
      return false;
    }
  }

  function askUnsavedAction(message) {
    const messageNode = document.getElementById("unsavedDialogMessage");
    if (messageNode) {
      messageNode.textContent = message || t("unsavedMessage");
    }

    dialogs.unsaved.returnValue = "cancel";
    dialogs.unsaved.showModal();
    return new Promise((resolve) => {
      const onClose = () => {
        dialogs.unsaved.removeEventListener("close", onClose);
        resolve(dialogs.unsaved.returnValue || "cancel");
      };
      dialogs.unsaved.addEventListener("close", onClose);
    });
  }

  async function ensureTabSavedOrDiscarded(tab) {
    if (!tab || !tab.textChanged) {
      return true;
    }

    const action = await askUnsavedAction(t("unsavedMessageNamed", { name: tab.fileName || t("untitled") }));
    if (action === "cancel") {
      return false;
    }
    if (action === "discard") {
      return true;
    }

    const previousActiveId = state.activeTabId;
    state.activeTabId = tab.id;
    syncEditorFromActiveTab();
    const saved = await saveLocalFile();

    if (!saved) {
      return false;
    }

    if (state.tabs.some((item) => item.id === previousActiveId)) {
      state.activeTabId = previousActiveId;
      syncEditorFromActiveTab();
    }
    return true;
  }

  function reorderTabs(fromId, toId) {
    if (!fromId || !toId || fromId === toId) {
      return;
    }
    const fromIndex = state.tabs.findIndex((tab) => tab.id === fromId);
    const toIndex = state.tabs.findIndex((tab) => tab.id === toId);
    if (fromIndex === -1 || toIndex === -1) {
      return;
    }
    const [moved] = state.tabs.splice(fromIndex, 1);
    state.tabs.splice(toIndex, 0, moved);
    persistSession();
    renderTabs();
  }

  function pushClosedTab(tab) {
    state.closedTabs.unshift({
      fileName: tab.fileName,
      text: tab.text,
      textChanged: tab.textChanged,
      selectionStart: tab.selectionStart,
      selectionEnd: tab.selectionEnd,
      scrollTop: tab.scrollTop,
      driveFileId: tab.driveFileId
    });
    if (state.closedTabs.length > 20) {
      state.closedTabs.length = 20;
    }
  }

  async function closeTabsByIds(tabIds) {
    for (const tabId of tabIds) {
      const current = state.tabs.find((tab) => tab.id === tabId);
      if (!current) {
        continue;
      }
      await closeTab(tabId);
      if (state.tabs.some((tab) => tab.id === tabId)) {
        return false;
      }
    }
    return true;
  }

  async function closeOtherTabs(tabId) {
    const ids = state.tabs.filter((tab) => tab.id !== tabId).map((tab) => tab.id);
    await closeTabsByIds(ids);
  }

  async function closeTabsToRight(tabId) {
    const index = state.tabs.findIndex((tab) => tab.id === tabId);
    if (index === -1) {
      return;
    }
    const ids = state.tabs.slice(index + 1).map((tab) => tab.id);
    await closeTabsByIds(ids);
  }

  function reopenClosedTab() {
    const snapshot = state.closedTabs.shift();
    if (!snapshot) {
      return;
    }
    openNewTab(snapshot);
  }

  function closeTabContextPopup() {
    tabContextPopup.classList.add("hidden");
    tabContextPopup.innerHTML = "";
  }

  function openTabContextMenu(tabId, x, y) {
    closeMenuPopup();
    closeTabContextPopup();

    const items = [
      [t("tabClose"), async () => closeTab(tabId)],
      [t("tabCloseOthers"), async () => closeOtherTabs(tabId)],
      [t("tabCloseRight"), async () => closeTabsToRight(tabId)],
      [t("tabReopenClosed"), () => reopenClosedTab()]
    ];

    items.forEach(([label, action], index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.addEventListener("click", async () => {
        closeTabContextPopup();
        await action();
      });
      tabContextPopup.appendChild(btn);

      if (index === 2) {
        const sep = document.createElement("div");
        sep.className = "menu-separator";
        tabContextPopup.appendChild(sep);
      }
    });

    tabContextPopup.style.left = `${x}px`;
    tabContextPopup.style.top = `${y}px`;
    tabContextPopup.classList.remove("hidden");
  }

  function getActiveTab() {
    return state.tabs.find((tab) => tab.id === state.activeTabId) || null;
  }

  function ensureActiveTab() {
    if (!state.tabs.length) {
      const tab = createTab();
      state.tabs.push(tab);
      state.activeTabId = tab.id;
      return tab;
    }
    if (!getActiveTab()) {
      state.activeTabId = state.tabs[0].id;
    }
    return getActiveTab();
  }

  function renderTabs() {
    tabList.innerHTML = "";
    state.tabs.forEach((tab) => {
      const tabBtn = document.createElement("button");
      tabBtn.type = "button";
      tabBtn.draggable = true;
      tabBtn.className = `tab${tab.id === state.activeTabId ? " active" : ""}${tab.textChanged ? " dirty" : ""}`;
      tabBtn.dataset.tabId = tab.id;

      const title = document.createElement("span");
      title.className = "tab__title";
      title.textContent = tab.fileName;

      const actions = document.createElement("span");
      actions.className = "tab__actions";

      const dot = document.createElement("span");
      dot.className = "tab__dot";
      dot.textContent = "●";
      dot.setAttribute("aria-hidden", "true");

      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.draggable = false;
      closeBtn.className = "tab__close";
      closeBtn.textContent = "×";
      closeBtn.setAttribute("aria-label", t("tabClose"));
      closeBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        await closeTab(tab.id);
      });
      actions.append(dot, closeBtn);

      tabBtn.addEventListener("click", () => switchTab(tab.id));
      tabBtn.addEventListener("auxclick", async (e) => {
        if (e.button === 1) {
          e.preventDefault();
          await closeTab(tab.id);
        }
      });
      tabBtn.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        openTabContextMenu(tab.id, e.clientX, e.clientY);
      });
      tabBtn.addEventListener("dragstart", (e) => {
        state.draggedTabId = tab.id;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", tab.id);
      });
      tabBtn.addEventListener("dragover", (e) => {
        if (state.draggedTabId && state.draggedTabId !== tab.id) {
          e.preventDefault();
          tabBtn.classList.add("tab--drag-over");
        }
      });
      tabBtn.addEventListener("dragleave", () => {
        tabBtn.classList.remove("tab--drag-over");
      });
      tabBtn.addEventListener("drop", (e) => {
        e.preventDefault();
        tabBtn.classList.remove("tab--drag-over");
        const fromId = state.draggedTabId || e.dataTransfer.getData("text/plain");
        reorderTabs(fromId, tab.id);
      });
      tabBtn.addEventListener("dragend", () => {
        state.draggedTabId = null;
        tabList.querySelectorAll(".tab--drag-over").forEach((node) => node.classList.remove("tab--drag-over"));
      });

      tabBtn.append(title, actions);
      tabList.appendChild(tabBtn);
    });
  }

  function syncEditorFromActiveTab() {
    const active = ensureActiveTab();
    editor.value = active.text;
    const maxPos = editor.value.length;
    const start = Math.max(0, Math.min(active.selectionStart || 0, maxPos));
    const end = Math.max(start, Math.min(active.selectionEnd || start, maxPos));
    editor.setSelectionRange(start, end);
    editor.scrollTop = Math.max(0, active.scrollTop || 0);
    updateCursorStatus();
    renderTabs();
    setTitle();
  }

  function syncActiveViewStateFromEditor() {
    const active = getActiveTab();
    if (!active) {
      return;
    }
    active.selectionStart = editor.selectionStart;
    active.selectionEnd = editor.selectionEnd;
    active.scrollTop = editor.scrollTop;
  }

  function syncActiveTabFromEditor() {
    const active = getActiveTab();
    if (!active) {
      return;
    }
    active.text = editor.value;
    syncActiveViewStateFromEditor();
    persistSession();
  }

  function switchTab(tabId) {
    syncActiveTabFromEditor();
    state.activeTabId = tabId;
    persistSession();
    syncEditorFromActiveTab();
    editor.focus();
  }

  function openNewTab(initial = {}) {
    syncActiveTabFromEditor();
    const tab = createTab(initial);
    state.tabs.push(tab);
    state.activeTabId = tab.id;
    persistSession();
    syncEditorFromActiveTab();
  }

  async function closeTab(tabId) {
    const tab = state.tabs.find((item) => item.id === tabId);
    if (!tab) {
      return;
    }
    const canClose = await ensureTabSavedOrDiscarded(tab);
    if (!canClose) {
      return;
    }

    const closeIndex = state.tabs.findIndex((item) => item.id === tabId);
  pushClosedTab(tab);
    state.tabs.splice(closeIndex, 1);
    if (!state.tabs.length) {
      const fresh = createTab();
      state.tabs.push(fresh);
      state.activeTabId = fresh.id;
    } else if (state.activeTabId === tabId) {
      const next = state.tabs[Math.min(closeIndex, state.tabs.length - 1)];
      state.activeTabId = next.id;
    }
    persistSession();
    syncEditorFromActiveTab();
  }

  function moveTabBy(offset) {
    if (state.tabs.length <= 1) {
      return;
    }
    const index = state.tabs.findIndex((tab) => tab.id === state.activeTabId);
    if (index === -1) {
      return;
    }
    const nextIndex = (index + offset + state.tabs.length) % state.tabs.length;
    switchTab(state.tabs[nextIndex].id);
  }

  let MENU_DEFS = {};

  function buildMenuDefs() {
    MENU_DEFS = {
      file: [
        [t("fileNew"), () => newFile()],
        [t("fileNewTab"), () => openNewTab()],
        [t("fileCloseTab"), () => closeActiveTab()],
        "sep",
        [t("fileOpen"), () => openLocalFile()],
        [t("fileSave"), () => saveLocalFile()],
        [t("fileSaveAs"), () => saveLocalFileAs()],
        "sep",
        [t("fileDriveConfig"), () => configureDrive()],
        [t("fileDriveOpen"), () => openFromDrive()],
        [t("fileDriveSave"), () => saveToDrive()],
        "sep",
        [t("fileExit"), () => maybeConfirmDiscard()]
      ],
      edit: [
        [t("editUndo"), () => document.execCommand("undo")],
        "sep",
        [t("editCut"), () => document.execCommand("cut")],
        [t("editCopy"), () => document.execCommand("copy")],
        [t("editPaste"), () => document.execCommand("paste")],
        [t("editDelete"), () => deleteSelection()],
        "sep",
        [t("editFind"), () => openFindDialog()],
        [t("editFindNext"), () => findNext()],
        [t("editReplace"), () => openReplaceDialog()],
        [t("editGoTo"), () => openGoToDialog()],
        "sep",
        [t("editSelectAll"), () => editor.select()],
        [t("editDateTime"), () => insertDateTime()]
      ],
      view: [
        [t("formatWordWrap"), () => toggleWordWrap(), () => state.wordWrap],
        [t("viewStatusBar"), () => toggleStatusBar(), () => state.statusBarVisible]
      ],
      help: [[t("helpInstall"), () => installAsApp()], "sep", [t("helpAbout"), () => dialogs.about.showModal()]]
    };
  }

  function applyLocalizedTexts() {
    document.documentElement.lang = locale;

    const setText = (id, value) => {
      const node = document.getElementById(id);
      if (node) {
        node.textContent = value;
      }
    };

    setText("menuFileBtn", t("menuFile"));
    setText("menuEditBtn", t("menuEdit"));
    setText("menuViewBtn", t("menuView"));
    setText("menuHelpBtn", t("menuHelp"));
    setText("textFormat", t("textFormat"));
    setText("settingsTitle", t("settingsTitle"));
    setText("settingsFontHeading", t("settingsFont"));
    setText("settingsFontFamilyLabel", t("settingsFontFamily"));
    setText("settingsFontSizeLabel", t("settingsFontSize"));
    setText("settingsWordWrapLabel", t("formatWordWrap"));
    setText("settingsStatusBarLabel", t("viewStatusBar"));
    setText("settingsCloseBtn", t("close"));
    const settingsBtn = document.getElementById("settingsBtn");
    if (settingsBtn) {
      settingsBtn.setAttribute("title", t("settingsTitle"));
      settingsBtn.setAttribute("aria-label", t("settingsTitle"));
    }
    setText("findDialogTitle", t("findTitle"));
    setText("findDialogLabel", t("findLabel"));
    setText("findNextBtn", t("findNext"));
    setText("findCancelBtn", t("cancel"));
    setText("replaceDialogTitle", t("replaceTitle"));
    setText("replaceFindLabel", t("replaceFindLabel"));
    setText("replaceToLabel", t("replaceToLabel"));
    setText("replaceNextBtn", t("findNext"));
    setText("replaceOneBtn", t("replaceOne"));
    setText("replaceAllBtn", t("replaceAll"));
    setText("replaceCancelBtn", t("cancel"));
    setText("goToDialogTitle", t("goToTitle"));
    setText("goToDialogLabel", t("goToLabel"));
    setText("goToBtn", t("goToBtn"));
    setText("goToCancelBtn", t("cancel"));
    setText("unsavedDialogTitle", t("unsavedTitle"));
    setText("unsavedDialogMessage", t("unsavedMessage"));
    setText("unsavedSaveBtn", t("unsavedSave"));
    setText("unsavedDiscardBtn", t("unsavedDiscard"));
    setText("unsavedCancelBtn", t("cancel"));
    setText("aboutDialogTitle", t("aboutTitle"));
    setText("aboutName", t("aboutName"));
    setText("aboutDesc", t("aboutDesc"));
    setText("aboutOkBtn", t("ok"));
    setText("driveConfigTitle", t("driveConfigTitle"));
    setText("driveConfigHint", t("driveConfigHint"));
    setText("driveClientLabel", "OAuth Client ID:");
    setText("saveDriveConfigBtn", t("save"));
    setText("driveConfigCancelBtn", t("cancel"));
    setText("driveFileDialogTitle", t("driveFileTitle"));
    setText("driveFileCloseBtn", t("close"));

    const editorNode = document.getElementById("editor");
    if (editorNode) {
      editorNode.setAttribute("aria-label", locale === "ja" ? "テキスト編集エリア" : "Text editor area");
    }

    const windowNode = document.querySelector(".window");
    if (windowNode) {
      windowNode.setAttribute("aria-label", t("appName"));
    }

    const menuBarNode = document.getElementById("menuBar");
    if (menuBarNode) {
      menuBarNode.setAttribute("aria-label", locale === "ja" ? "メニュー" : "Menu");
    }

    const popupNode = document.getElementById("menuPopup");
    if (popupNode) {
      popupNode.setAttribute("aria-label", locale === "ja" ? "ポップアップメニュー" : "Popup menu");
    }

    const tabPopupNode = document.getElementById("tabContextPopup");
    if (tabPopupNode) {
      tabPopupNode.setAttribute("aria-label", locale === "ja" ? "タブメニュー" : "Tab menu");
    }
  }

  function isChromebook() {
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";
    return ua.includes("CrOS") || platform.toLowerCase().includes("cros");
  }

  function resolveAutoDriveClientId() {
    const params = new URLSearchParams(window.location.search);
    const fromParam = params.get("driveClientId") || params.get("client_id");
    if (fromParam && fromParam.trim()) {
      return fromParam.trim();
    }

    if (!isChromebook()) {
      return "";
    }

    const fromChromebookConfig = (runtimeConfig.chromebookDriveClientId || "").trim();
    if (fromChromebookConfig) {
      return fromChromebookConfig;
    }

    const fromDefaultConfig = (runtimeConfig.driveClientId || "").trim();
    if (fromDefaultConfig) {
      return fromDefaultConfig;
    }

    return "";
  }

  function autoConfigureDriveIfNeeded() {
    if (state.driveClientId) {
      return;
    }

    const autoId = resolveAutoDriveClientId();
    if (!autoId) {
      return;
    }

    state.driveClientId = autoId;
    localStorage.setItem("web-notepad.driveClientId", autoId);
    statusText.textContent = t("statusDriveAutoConfigured");
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      return;
    }
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (err) {
      console.error("Service Worker 登録に失敗:", err);
    }
  }

  async function installAsApp() {
    if (state.deferredInstallPrompt) {
      state.deferredInstallPrompt.prompt();
      const result = await state.deferredInstallPrompt.userChoice;
      if (result.outcome === "accepted") {
        statusText.textContent = t("statusInstallDone");
      }
      state.deferredInstallPrompt = null;
      return;
    }

    alert(t("installFallback"));
  }

  function setTitle() {
    const active = ensureActiveTab();
    const dirty = active.textChanged ? "*" : "";
    windowTitle.textContent = `${dirty}${active.fileName} - ${t("appName")}`;
    document.title = `${dirty}${active.fileName} - ${t("appName")}`;
  }

  function markDirty(flag) {
    const active = getActiveTab();
    if (!active) {
      return;
    }
    active.textChanged = flag;
    syncActiveTabFromEditor();
    persistSession();
    renderTabs();
    setTitle();
  }

  function updateCursorStatus() {
    const pos = editor.selectionStart;
    const value = editor.value;
    const textUntilPos = value.slice(0, pos);
    const line = textUntilPos.split("\n").length;
    const col = pos - textUntilPos.lastIndexOf("\n");
    lineCol.textContent = t("cursor", { line, col });
    const charCountNode = document.getElementById("charCount");
    if (charCountNode) {
      charCountNode.textContent = t("charCount", { count: value.length });
    }
  }

  function setWordWrap(enabled) {
    state.wordWrap = enabled;
    editor.style.whiteSpace = enabled ? "pre-wrap" : "pre";
    editor.wrap = enabled ? "soft" : "off";
  }

  function setStatusBarVisible(visible) {
    state.statusBarVisible = visible;
    statusBar.classList.toggle("hidden", !visible);
  }

  function fileNameFromPath(name) {
    if (!name) {
      return t("untitled");
    }
    return name;
  }

  async function newFile() {
    if (!(await confirmDiscardIfNeeded())) {
      return;
    }
    const active = ensureActiveTab();
    active.text = "";
    active.fileName = t("untitled");
    active.localFileHandle = null;
    active.driveFileId = null;
    state.latestFindIndex = -1;
    markDirty(false);
    syncEditorFromActiveTab();
  }

  async function closeActiveTab() {
    await closeTab(state.activeTabId);
  }

  async function maybeConfirmDiscard() {
    const dirtyTabs = [...state.tabs].filter((tab) => tab.textChanged);
    for (const tab of dirtyTabs) {
      const ok = await ensureTabSavedOrDiscarded(tab);
      if (!ok) {
        return;
      }
    }
    window.close();
  }

  async function confirmDiscardIfNeeded() {
    const active = ensureActiveTab();
    if (!active.textChanged) {
      return true;
    }
    return ensureTabSavedOrDiscarded(active);
  }

  async function openLocalFile() {
    const active = ensureActiveTab();
    if (!(await confirmDiscardIfNeeded())) {
      return;
    }

    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [
            {
              description: locale === "ja" ? "テキスト" : "Text",
              accept: { "text/plain": [".txt", ".md", ".log", ".csv"] }
            }
          ]
        });
        if (!handle) {
          return;
        }
        const file = await handle.getFile();
        const content = await file.text();
        active.text = content;
        active.localFileHandle = handle;
        active.fileName = fileNameFromPath(file.name);
        active.driveFileId = null;
        markDirty(false);
        syncEditorFromActiveTab();
        return;
      } catch (err) {
        if (err && err.name === "AbortError") {
          return;
        }
      }
    }

    localFileInput.value = "";
    localFileInput.click();
  }

  async function saveLocalFile() {
    const active = ensureActiveTab();
    if (active.localFileHandle) {
      try {
        const writable = await active.localFileHandle.createWritable();
        await writable.write(editor.value);
        await writable.close();
        active.text = editor.value;
        markDirty(false);
        statusText.textContent = t("statusSaved");
        return true;
      } catch (err) {
        alert(t("saveFailed", { error: err.message }));
        return false;
      }
    }
    return saveLocalFileAs();
  }

  async function saveLocalFileAs() {
    const active = ensureActiveTab();
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: active.fileName === t("untitled") ? "untitled.txt" : active.fileName,
          types: [
            {
              description: locale === "ja" ? "テキスト" : "Text",
              accept: { "text/plain": [".txt", ".md", ".log", ".csv"] }
            }
          ]
        });
        if (!handle) {
          return false;
        }
        active.localFileHandle = handle;
        active.fileName = fileNameFromPath(handle.name);
        renderTabs();
        await saveLocalFile();
        return true;
      } catch (err) {
        if (err && err.name === "AbortError") {
          return false;
        }
      }
    }

    const blob = new Blob([editor.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = active.fileName === t("untitled") ? "untitled.txt" : active.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    active.text = editor.value;
    markDirty(false);
    return true;
  }

  function openFindDialog() {
    dialogs.find.showModal();
    document.getElementById("findInput").focus();
  }

  function openReplaceDialog() {
    dialogs.replace.showModal();
    document.getElementById("replaceFindInput").focus();
  }

  function openGoToDialog() {
    dialogs.goTo.showModal();
    document.getElementById("goToLineInput").focus();
  }

  function findNext() {
    const needle = document.getElementById("findInput").value;
    if (!needle) {
      return;
    }
    const hay = editor.value;
    let start = editor.selectionEnd;
    let idx = hay.indexOf(needle, start);
    if (idx === -1) {
      idx = hay.indexOf(needle, 0);
    }
    if (idx === -1) {
      alert(t("searchNotFound"));
      return;
    }
    editor.focus();
    editor.setSelectionRange(idx, idx + needle.length);
    state.latestFindIndex = idx;
    updateCursorStatus();
  }

  function replaceCurrent() {
    const findValue = document.getElementById("replaceFindInput").value;
    const replaceValue = document.getElementById("replaceToInput").value;
    if (!findValue) {
      return;
    }
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.slice(start, end);
    if (selected === findValue) {
      editor.setRangeText(replaceValue, start, end, "end");
      markDirty(true);
      updateCursorStatus();
      return true;
    }
    return false;
  }

  function replaceAll() {
    const findValue = document.getElementById("replaceFindInput").value;
    const replaceValue = document.getElementById("replaceToInput").value;
    if (!findValue) {
      return;
    }
    editor.value = editor.value.split(findValue).join(replaceValue);
    markDirty(true);
    updateCursorStatus();
  }

  function goToLine() {
    const raw = document.getElementById("goToLineInput").value;
    const lineNo = Math.max(1, Number(raw || "1"));
    const lines = editor.value.split("\n");
    let pos = 0;
    for (let i = 0; i < Math.min(lineNo - 1, lines.length - 1); i += 1) {
      pos += lines[i].length + 1;
    }
    editor.focus();
    editor.setSelectionRange(pos, pos);
    updateCursorStatus();
  }

  function deleteSelection() {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    if (start === end) {
      return;
    }
    editor.setRangeText("", start, end, "start");
    markDirty(true);
    updateCursorStatus();
  }

  function insertDateTime() {
    const value = new Date().toLocaleString(locale === "ja" ? "ja-JP" : "en-US");
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.setRangeText(value, start, end, "end");
    markDirty(true);
    updateCursorStatus();
  }

  function toggleWordWrap() {
    setWordWrap(!state.wordWrap);
    saveSettings();
  }

  function toggleStatusBar() {
    setStatusBarVisible(!state.statusBarVisible);
    saveSettings();
  }

  function applyFont() {
    editor.style.fontFamily = state.fontFamily || DEFAULT_FONT_FAMILY;
    editor.style.fontSize = `${state.fontSize || DEFAULT_FONT_SIZE}px`;
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const saved = JSON.parse(raw) || {};
      if (typeof saved.fontFamily === "string" && saved.fontFamily) {
        state.fontFamily = saved.fontFamily;
      }
      if (Number(saved.fontSize)) {
        state.fontSize = Number(saved.fontSize);
      }
      if (typeof saved.wordWrap === "boolean") {
        state.wordWrap = saved.wordWrap;
      }
      if (typeof saved.statusBarVisible === "boolean") {
        state.statusBarVisible = saved.statusBarVisible;
      }
    } catch {
      // Ignore malformed settings.
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          fontFamily: state.fontFamily,
          fontSize: state.fontSize,
          wordWrap: state.wordWrap,
          statusBarVisible: state.statusBarVisible
        })
      );
    } catch {
      // Ignore storage restrictions.
    }
  }

  function openSettings() {
    const fontFamily = document.getElementById("settingsFontFamily");
    const fontSize = document.getElementById("settingsFontSize");
    const wordWrap = document.getElementById("settingsWordWrap");
    const statusBar = document.getElementById("settingsStatusBar");
    fontFamily.value = state.fontFamily;
    fontSize.value = String(state.fontSize);
    wordWrap.checked = state.wordWrap;
    statusBar.checked = state.statusBarVisible;
    dialogs.settings.showModal();
  }

  function bindSettings() {
    const fontFamily = document.getElementById("settingsFontFamily");
    const fontSize = document.getElementById("settingsFontSize");
    const wordWrap = document.getElementById("settingsWordWrap");
    const statusBar = document.getElementById("settingsStatusBar");

    fontFamily.addEventListener("change", () => {
      state.fontFamily = fontFamily.value || DEFAULT_FONT_FAMILY;
      applyFont();
      saveSettings();
    });
    fontSize.addEventListener("change", () => {
      state.fontSize = Number(fontSize.value) || DEFAULT_FONT_SIZE;
      applyFont();
      saveSettings();
    });
    wordWrap.addEventListener("change", () => {
      setWordWrap(wordWrap.checked);
      saveSettings();
    });
    statusBar.addEventListener("change", () => {
      setStatusBarVisible(statusBar.checked);
      saveSettings();
    });

    document.getElementById("settingsBtn").addEventListener("click", openSettings);
  }

  function closeMenuPopup() {
    menuPopup.classList.add("hidden");
    menuPopup.innerHTML = "";
    menuButtons.forEach((btn) => btn.classList.remove("active"));
  }

  function openMenu(menuName, anchorButton) {
    closeMenuPopup();
    anchorButton.classList.add("active");
    const items = MENU_DEFS[menuName] || [];
    for (const item of items) {
      if (item === "sep") {
        const sep = document.createElement("div");
        sep.className = "menu-separator";
        menuPopup.appendChild(sep);
        continue;
      }
      const [label, action, checkedFn] = item;
      const btn = document.createElement("button");
      btn.type = "button";
      const checked = checkedFn && checkedFn();
      const [mainLabel, shortcut] = label.split("\t");

      const check = document.createElement("span");
      check.className = "menu-item__check";
      check.textContent = checked ? "✓" : "";

      const text = document.createElement("span");
      text.className = "menu-item__label";
      text.textContent = mainLabel;

      const sc = document.createElement("span");
      sc.className = "menu-item__shortcut";
      sc.textContent = shortcut || "";

      btn.append(check, text, sc);
      btn.addEventListener("click", () => {
        closeMenuPopup();
        action();
      });
      menuPopup.appendChild(btn);
    }
    const rect = anchorButton.getBoundingClientRect();
    menuPopup.classList.remove("hidden");
    const width = menuPopup.offsetWidth;
    let left = rect.left;
    if (left + width > window.innerWidth - 8) {
      left = window.innerWidth - 8 - width;
    }
    menuPopup.style.left = `${Math.max(8, left)}px`;
    menuPopup.style.top = `${rect.bottom}px`;
  }

  function bindMenu() {
    menuButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openMenu(btn.dataset.menu, btn);
      });
    });
    window.addEventListener("click", (e) => {
      if (!menuPopup.contains(e.target)) {
        closeMenuPopup();
      }
      if (!tabContextPopup.contains(e.target)) {
        closeTabContextPopup();
      }
    });
  }

  function bindDialogs() {
    document.getElementById("findNextBtn").addEventListener("click", (e) => {
      e.preventDefault();
      findNext();
    });

    document.getElementById("replaceNextBtn").addEventListener("click", (e) => {
      e.preventDefault();
      const findValue = document.getElementById("replaceFindInput").value;
      document.getElementById("findInput").value = findValue;
      findNext();
    });

    document.getElementById("replaceOneBtn").addEventListener("click", (e) => {
      e.preventDefault();
      if (!replaceCurrent()) {
        const findValue = document.getElementById("replaceFindInput").value;
        document.getElementById("findInput").value = findValue;
        findNext();
      }
    });

    document.getElementById("replaceAllBtn").addEventListener("click", (e) => {
      e.preventDefault();
      replaceAll();
    });

    document.getElementById("goToBtn").addEventListener("click", (e) => {
      e.preventDefault();
      goToLine();
      dialogs.goTo.close();
    });

    document.getElementById("saveDriveConfigBtn").addEventListener("click", (e) => {
      e.preventDefault();
      const input = document.getElementById("driveClientIdInput");
      const id = input.value.trim();
      if (!id) {
        alert(t("oauthClientRequired"));
        return;
      }
      state.driveClientId = id;
      localStorage.setItem("web-notepad.driveClientId", id);
      dialogs.driveConfig.close();
      alert(t("driveConfigSaved"));
    });
  }

  function configureDrive() {
    const input = document.getElementById("driveClientIdInput");
    input.value = state.driveClientId;
    dialogs.driveConfig.showModal();
    input.focus();
  }

  function ensureTokenClient() {
    if (!state.driveClientId) {
      configureDrive();
      return false;
    }
    if (!window.google || !google.accounts || !google.accounts.oauth2) {
      alert(t("gisLoadFailed"));
      return false;
    }
    if (!state.tokenClient) {
      state.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: state.driveClientId,
        scope: "https://www.googleapis.com/auth/drive.file",
        callback: () => {}
      });
    }
    return true;
  }

  function getDriveAccessToken() {
    return new Promise((resolve, reject) => {
      if (!ensureTokenClient()) {
        reject(new Error(t("driveConfigIncomplete")));
        return;
      }
      state.tokenClient.callback = (resp) => {
        if (resp.error) {
          reject(new Error(resp.error));
          return;
        }
        state.driveToken = resp.access_token;
        resolve(resp.access_token);
      };
      state.tokenClient.requestAccessToken({ prompt: state.driveToken ? "" : "consent" });
    });
  }

  async function driveFetch(path, options = {}) {
    const token = state.driveToken || (await getDriveAccessToken());
    const res = await fetch(`https://www.googleapis.com${path}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Drive API Error: ${res.status}`);
    }
    return res;
  }

  async function openFromDrive() {
    const active = ensureActiveTab();
    try {
      await getDriveAccessToken();
      const res = await driveFetch(
        "/drive/v3/files?q=mimeType%20%3D%20%27text%2Fplain%27%20and%20trashed%20%3D%20false&fields=files(id%2Cname%2CmodifiedTime)&orderBy=modifiedTime%20desc&pageSize=50"
      );
      const data = await res.json();
      const list = document.getElementById("driveFileList");
      list.innerHTML = "";
      if (!data.files || data.files.length === 0) {
        list.innerHTML = `<div class='drive-file-item'>${t("driveFileNotFound")}</div>`;
        dialogs.driveFile.showModal();
        return;
      }
      data.files.forEach((file) => {
        const row = document.createElement("div");
        row.className = "drive-file-item";
        const info = document.createElement("span");
        const modified = new Date(file.modifiedTime).toLocaleString(locale === "ja" ? "ja-JP" : "en-US");
        info.textContent = `${file.name} (${modified})`;
        const openBtn = document.createElement("button");
        openBtn.type = "button";
        openBtn.textContent = t("driveFileOpen");
        openBtn.addEventListener("click", async () => {
          const contentRes = await driveFetch(`/drive/v3/files/${file.id}?alt=media`);
          const text = await contentRes.text();
          active.text = text;
          active.fileName = file.name;
          active.driveFileId = file.id;
          active.localFileHandle = null;
          markDirty(false);
          syncEditorFromActiveTab();
          dialogs.driveFile.close();
          statusText.textContent = t("statusDriveLoaded");
        });
        row.append(info, openBtn);
        list.appendChild(row);
      });
      dialogs.driveFile.showModal();
    } catch (err) {
      alert(t("driveOpenFailed", { error: err.message }));
    }
  }

  async function saveToDrive() {
    const active = ensureActiveTab();
    try {
      await getDriveAccessToken();
      const boundary = "-------314159265358979323846";
      const metadata = {
        name: active.fileName === t("untitled") ? "untitled.txt" : active.fileName,
        mimeType: "text/plain"
      };

      const multipartRequestBody =
        `--${boundary}\r\n` +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        `${JSON.stringify(metadata)}\r\n` +
        `--${boundary}\r\n` +
        "Content-Type: text/plain\r\n\r\n" +
        `${editor.value}\r\n` +
        `--${boundary}--`;

      let res;
      if (active.driveFileId) {
        res = await driveFetch(`/upload/drive/v3/files/${active.driveFileId}?uploadType=multipart`, {
          method: "PATCH",
          headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
          body: multipartRequestBody
        });
      } else {
        res = await driveFetch("/upload/drive/v3/files?uploadType=multipart", {
          method: "POST",
          headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
          body: multipartRequestBody
        });
      }

      const data = await res.json();
      active.driveFileId = data.id || active.driveFileId;
      active.fileName = data.name || metadata.name;
      active.localFileHandle = null;
      active.text = editor.value;
      markDirty(false);
      statusText.textContent = t("statusDriveSaved");
    } catch (err) {
      alert(t("driveSaveFailed", { error: err.message }));
    }
  }

  function bindEvents() {
    editor.addEventListener("input", () => {
      syncActiveTabFromEditor();
      markDirty(true);
      updateCursorStatus();
    });

    editor.addEventListener("click", updateCursorStatus);
    editor.addEventListener("keyup", updateCursorStatus);
    editor.addEventListener("click", syncActiveViewStateFromEditor);
    editor.addEventListener("keyup", syncActiveViewStateFromEditor);
    editor.addEventListener("select", syncActiveViewStateFromEditor);
    editor.addEventListener("scroll", syncActiveViewStateFromEditor);

    editor.addEventListener("dragover", (e) => e.preventDefault());
    editor.addEventListener("drop", async (e) => {
      e.preventDefault();
      const active = ensureActiveTab();
      const file = e.dataTransfer.files[0];
      if (!file) {
        return;
      }
      const text = await file.text();
      active.text = text;
      active.fileName = file.name;
      active.localFileHandle = null;
      active.driveFileId = null;
      markDirty(false);
      syncEditorFromActiveTab();
    });

    localFileInput.addEventListener("change", async () => {
      const active = ensureActiveTab();
      const file = localFileInput.files[0];
      if (!file) {
        return;
      }
      const content = await file.text();
      active.text = content;
      active.fileName = file.name;
      active.localFileHandle = null;
      active.driveFileId = null;
      markDirty(false);
      syncEditorFromActiveTab();
    });

    window.addEventListener("beforeunload", (e) => {
      if (!state.tabs.some((tab) => tab.textChanged)) {
        return;
      }
      e.preventDefault();
      e.returnValue = "";
    });

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      state.deferredInstallPrompt = e;
      statusText.textContent = t("statusInstallReady");
    });

    window.addEventListener("appinstalled", () => {
      state.deferredInstallPrompt = null;
      statusText.textContent = t("statusAppInstalled");
    });

    window.addEventListener("keydown", (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveLocalFile();
      } else if (ctrl && e.key.toLowerCase() === "o") {
        e.preventDefault();
        openLocalFile();
      } else if (ctrl && e.key.toLowerCase() === "n") {
        e.preventDefault();
        openNewTab();
      } else if (ctrl && e.key.toLowerCase() === "t") {
        e.preventDefault();
        openNewTab();
      } else if (ctrl && e.key.toLowerCase() === "w") {
        e.preventDefault();
        closeActiveTab();
      } else if (ctrl && e.key === "Tab") {
        e.preventDefault();
        moveTabBy(e.shiftKey ? -1 : 1);
      } else if (ctrl && e.key === "PageUp") {
        e.preventDefault();
        moveTabBy(-1);
      } else if (ctrl && e.key === "PageDown") {
        e.preventDefault();
        moveTabBy(1);
      } else if (ctrl && e.key.toLowerCase() === "f") {
        e.preventDefault();
        openFindDialog();
      } else if (ctrl && e.key.toLowerCase() === "h") {
        e.preventDefault();
        openReplaceDialog();
      } else if (ctrl && e.key.toLowerCase() === "g") {
        e.preventDefault();
        openGoToDialog();
      } else if (e.key === "F3") {
        e.preventDefault();
        findNext();
      } else if (e.key === "F5") {
        e.preventDefault();
        insertDateTime();
      } else if (e.key === "Escape") {
        closeMenuPopup();
        closeTabContextPopup();
      }
    });

    newTabBtn.addEventListener("click", () => openNewTab());
  }

  function init() {
    registerServiceWorker();
    loadSettings();
    applyLocalizedTexts();
    autoConfigureDriveIfNeeded();
    if (!restoreSession()) {
      openNewTab();
    } else {
      syncEditorFromActiveTab();
    }
    buildMenuDefs();
    setTitle();
    applyFont();
    setWordWrap(state.wordWrap);
    setStatusBarVisible(state.statusBarVisible);
    bindMenu();
    bindDialogs();
    bindSettings();
    bindEvents();
    updateCursorStatus();
  }

  init();
})();
