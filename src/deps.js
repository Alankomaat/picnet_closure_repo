// This file was autogenerated by U:\shared\lib\closure-library\closure\bin\build\depswriter.py.
// Please do not edit.
goog.addDependency('../../../picnet_closure_repo/src/demos/datamanagerdemo.js', ['pn.demo.datamanagerdemo'], ['pn.MockAjaxProvider', 'pn.data.DataManager', 'pn.data.LocalStorageRepository']);
goog.addDependency('../../../picnet_closure_repo/src/demos/daterangepickerdemo.js', ['pn.demo.daterangepickerdemo'], ['pn.ui.DateRangePicker']);
goog.addDependency('../../../picnet_closure_repo/src/demos/demoscripts.js', ['pn.closure.repo.demoscripts'], ['pn.demo.datamanagerdemo', 'pn.demo.daterangepickerdemo', 'pn.demo.tabslidemenudemo']);
goog.addDependency('../../../picnet_closure_repo/src/demos/tabslidemenudemo.js', ['pn.demo.tabslidemenudemo'], ['pn.ui.TabSlideMenu', 'pn.ui.TabSlideMenuSettings']);
goog.addDependency('../../../picnet_closure_repo/src/pn/LogUtils.js', ['pn.LogUtils'], ['goog.debug', 'goog.debug.Console', 'goog.debug.LogManager', 'goog.debug.Logger', 'goog.object']);
goog.addDependency('../../../picnet_closure_repo/src/pn/Utils.js', ['pn.Utils'], ['goog.array', 'goog.dom', 'goog.json', 'goog.string']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/AbstractRepository.js', ['pn.data.AbstractRepository'], ['goog.Disposable', 'goog.array', 'goog.debug', 'goog.debug.Logger', 'goog.object', 'pn.data.IEntity', 'pn.data.IRepository']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/AbstractSQLRepository.js', ['pn.data.AbstractSQLRepository'], ['pn.Utils', 'pn.data.AbstractRepository', 'pn.data.IEntity', 'pn.data.IRepository']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/DataDownloader.js', ['pn.data.DataDownloader'], ['goog.dom', 'goog.events', 'goog.net.EventType', 'goog.net.IframeIo']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/DataManager.js', ['pn.data.DataManager'], ['goog.array', 'goog.net.cookies', 'goog.object', 'goog.string', 'pn.data.DefaultRepositoryFactory', 'pn.data.IDataAjaxRequest', 'pn.data.IDataProvider', 'pn.data.IEntity', 'pn.data.InMemoryProvider', 'pn.data.LocalDataProvider', 'pn.data.RemoteDataProvider', 'pn.data.TransactionResult']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/DefaultRepositoryFactory.js', ['pn.data.DefaultRepositoryFactory'], ['pn.data.GearsRepository', 'pn.data.IRepository', 'pn.data.IndexedDBRepository', 'pn.data.WebSQLRepository']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/GearsRepository.js', ['pn.data.GearsRepository'], ['pn.Utils', 'pn.data.AbstractSQLRepository']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/IDataProvider.js', ['pn.data.IDataProvider'], ['pn.data.TransactionResult']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/IEntity.js', ['pn.data.IEntity'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/IRepository.js', ['pn.data.IRepository'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/InMemoryProvider.js', ['pn.data.InMemoryProvider'], ['goog.array', 'goog.object', 'pn.data.IDataProvider', 'pn.data.InMemoryRepository']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/InMemoryRepository.js', ['pn.data.InMemoryRepository'], ['goog.array', 'goog.object', 'pn.data.IEntity']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/IndexedDBRepository.js', ['pn.data.IndexedDBRepository'], ['goog.debug', 'pn.data.AbstractRepository', 'pn.data.IEntity']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/LocalDataProvider.js', ['pn.data.LocalDataProvider'], ['goog.array', 'goog.object', 'pn.Utils', 'pn.data.IDataProvider', 'pn.data.IEntity', 'pn.data.IRepository', 'pn.data.TransactionResult']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/LocalStorageRepository.js', ['pn.data.LocalStorageRepository'], ['pn.Utils', 'pn.data.AbstractRepository', 'pn.data.IRepository']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/RemoteDataProvider.js', ['pn.data.IDataAjaxRequest', 'pn.data.RemoteDataProvider'], ['goog.Disposable', 'goog.array', 'goog.object', 'pn.Utils', 'pn.data.IDataProvider', 'pn.data.IEntity', 'pn.data.TransactionResult']);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/TransactionResult.js', ['pn.data.TransactionResult'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/data/WebSQLRepository.js', ['pn.data.WebSQLRepository'], ['goog.debug', 'pn.Utils', 'pn.data.AbstractSQLRepository']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/DateRangePicker.js', ['pn.ui.DateRangePicker'], ['goog.array', 'goog.date.Date', 'goog.dom', 'goog.dom.DomHelper', 'goog.events.Event', 'goog.events.EventType', 'goog.i18n.DateTimeFormat', 'goog.positioning.AnchoredPosition', 'goog.positioning.Corner', 'goog.style', 'goog.ui.Component', 'goog.ui.DatePicker', 'goog.ui.DatePicker.Events', 'goog.ui.Popup', 'goog.ui.PopupBase.EventType']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/FileUpload.js', ['pn.ui.FileUpload', 'pn.ui.FileUpload.EventType'], ['goog.array', 'goog.dom', 'goog.events', 'goog.events.Event', 'goog.events.EventHandler', 'goog.events.EventType', 'goog.net.EventType', 'goog.net.IframeIo', 'goog.ui.Component']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/SpecDisplayItem.js', ['pn.ui.SpecDisplayItem'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/TabSlideMenu.js', ['pn.ui.TabSlideMenu'], ['goog.Timer', 'goog.dom', 'goog.dom.classes', 'goog.events', 'goog.fx.Animation', 'goog.fx.easing', 'goog.style', 'goog.userAgent', 'pn.ui.TabSlideMenuSettings']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/TabSlideMenuSettings.js', ['pn.ui.TabSlideMenuSettings'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/Command.js', ['pn.ui.edit.Command'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/CommandsComponent.js', ['pn.ui.edit.CommandsComponent'], ['goog.dom', 'goog.events.Event', 'goog.events.EventHandler', 'goog.ui.Button', 'goog.ui.Component', 'goog.ui.Component.EventType', 'pn.ui.edit.Command', 'pn.ui.edit.ComplexRenderer', 'pn.ui.edit.Config', 'pn.ui.edit.Field', 'pn.ui.edit.FieldBuilder', 'pn.ui.edit.FieldValidator', 'pn.ui.grid.Column', 'pn.ui.grid.Config', 'pn.ui.grid.Grid']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/ComplexRenderer.js', ['pn.ui.edit.ComplexRenderer'], ['goog.events.EventHandler', 'goog.ui.Component']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/Config.js', ['pn.ui.edit.Config'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/DecimalRenderer.js', ['pn.ui.edit.DecimalRenderer'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/Edit.js', ['pn.ui.edit.Edit'], ['goog.dom', 'goog.events.Event', 'goog.events.EventHandler', 'goog.ui.Button', 'goog.ui.Component', 'goog.ui.Component.EventType', 'pn.ui.edit.Command', 'pn.ui.edit.CommandsComponent', 'pn.ui.edit.ComplexRenderer', 'pn.ui.edit.Config', 'pn.ui.edit.Field', 'pn.ui.edit.FieldBuilder', 'pn.ui.edit.FieldValidator', 'pn.ui.grid.Column', 'pn.ui.grid.Config', 'pn.ui.grid.Grid']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/Field.js', ['pn.ui.edit.Field'], ['goog.date.Date', 'goog.ui.InputDatePicker', 'goog.ui.LabelInput', 'pn.ui.SpecDisplayItem', 'pn.ui.edit.ComplexRenderer', 'pn.ui.edit.ValidateInfo']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/FieldBuilder.js', ['pn.ui.edit.FieldBuilder'], ['goog.date.Date']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/FieldRenderers.js', ['pn.ui.edit.FieldRenderers'], ['goog.date.Date', 'goog.ui.InputDatePicker', 'goog.ui.LabelInput']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/FieldValidator.js', ['pn.ui.edit.FieldValidator'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/edit/ValidateInfo.js', ['pn.ui.edit.ValidateInfo'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/grid/Column.js', ['pn.ui.grid.Column'], ['pn.ui.SpecDisplayItem']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/grid/ColumnRenderers.js', ['pn.ui.grid.ColumnRenderers'], ['pn.ui.SpecDisplayItem']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/grid/Command.js', ['pn.ui.grid.Command'], ['goog.events.Event', 'goog.events.EventHandler', 'goog.ui.Button', 'goog.ui.Component', 'pn.ui.grid.Grid.EventType']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/grid/Config.js', ['pn.ui.grid.Config'], []);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/grid/ExportCommand.js', ['pn.ui.grid.ExportCommand'], ['goog.events', 'goog.events.Event', 'goog.events.EventHandler', 'goog.json', 'goog.net.IframeIo', 'goog.ui.Component', 'goog.ui.Component.EventType', 'goog.ui.Option', 'goog.ui.Select']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/grid/Grid.js', ['pn.ui.grid.Grid', 'pn.ui.grid.Grid.EventType'], ['goog.dom', 'goog.events.Event', 'goog.events.EventHandler', 'goog.ui.Button', 'goog.ui.Component', 'goog.ui.Component.EventType', 'pn.ui.grid.Column', 'pn.ui.grid.Config', 'pn.ui.grid.QuickFilterHelpers']);
goog.addDependency('../../../picnet_closure_repo/src/pn/ui/grid/QuickFilterHelpers.js', ['pn.ui.grid.QuickFilterHelpers'], ['pn.ui.SpecDisplayItem']);
goog.addDependency('../../../picnet_closure_repo/src/tests/MockAjaxProvider.js', ['pn.MockAjaxProvider', 'pn.MockAjaxProvider.RealServerAjax'], ['goog.Uri.QueryData', 'goog.net.XhrIo', 'pn.data.IDataAjaxRequest']);
