import { IContainer, Key } from '@aurelia/kernel';
import { ICustomElementType, IRenderContext } from '@aurelia/runtime';
import { HistoryBrowser, IHistoryOptions, INavigationInstruction } from './history-browser';
import { InstructionResolver, IRouteSeparators } from './instruction-resolver';
import { AnchorEventInfo, LinkHandler } from './link-handler';
import { INavRoute, Nav } from './nav';
import { Scope } from './scope';
import { IViewportOptions, Viewport } from './viewport';
import { ViewportInstruction } from './viewport-instruction';
export interface IRouteTransformer {
    transformFromUrl?(route: string, router: Router): string | ViewportInstruction[];
    transformToUrl?(instructions: ViewportInstruction[], router: Router): string | ViewportInstruction[];
}
export declare const IRouteTransformer: import("@aurelia/kernel").InterfaceSymbol<IRouteTransformer>;
export interface IRouterOptions extends IHistoryOptions, IRouteTransformer {
    separators?: IRouteSeparators;
    reportCallback?(instruction: INavigationInstruction): void;
}
export interface IRouteViewport {
    name: string;
    component: Partial<ICustomElementType> | string;
}
export interface IRouter {
    readonly isNavigating: boolean;
    activate(options?: IRouterOptions): Promise<void>;
    deactivate(): void;
    linkCallback(info: AnchorEventInfo): void;
    historyCallback(instruction: INavigationInstruction): void;
    processNavigations(): Promise<void>;
    addProcessingViewport(componentOrInstruction: string | Partial<ICustomElementType> | ViewportInstruction, viewport?: Viewport | string): void;
    addViewport(name: string, element: Element, context: IRenderContext, options?: IViewportOptions): Viewport;
    removeViewport(viewport: Viewport, element: Element, context: IRenderContext): void;
    allViewports(): Viewport[];
    findScope(element: Element): Scope;
    removeScope(scope: Scope): void;
    goto(pathOrViewports: string | Record<string, Viewport>, title?: string, data?: Record<string, unknown>): Promise<void>;
    replace(pathOrViewports: string | Record<string, Viewport>, title?: string, data?: Record<string, unknown>): Promise<void>;
    refresh(): Promise<void>;
    back(): Promise<void>;
    forward(): Promise<void>;
    setNav(name: string, routes: INavRoute[]): void;
    addNav(name: string, routes: INavRoute[]): void;
    findNav(name: string): Nav;
}
export declare const IRouter: import("@aurelia/kernel").InterfaceSymbol<IRouter>;
export declare class Router implements IRouter {
    static readonly inject: readonly Key[];
    readonly container: IContainer;
    rootScope: Scope;
    scopes: Scope[];
    historyBrowser: HistoryBrowser;
    linkHandler: LinkHandler;
    instructionResolver: InstructionResolver;
    navs: Record<string, Nav>;
    activeComponents: string[];
    addedViewports: ViewportInstruction[];
    private options;
    private isActive;
    private readonly routeTransformer;
    private readonly pendingNavigations;
    private processingNavigation;
    private lastNavigation;
    constructor(container: IContainer, routeTransformer: IRouteTransformer, historyBrowser: HistoryBrowser, linkHandler: LinkHandler, instructionResolver: InstructionResolver);
    readonly isNavigating: boolean;
    activate(options?: IRouterOptions): Promise<void>;
    deactivate(): void;
    linkCallback: (info: AnchorEventInfo) => void;
    historyCallback(instruction: INavigationInstruction): void;
    processNavigations(): Promise<void>;
    addProcessingViewport(componentOrInstruction: string | Partial<ICustomElementType> | ViewportInstruction, viewport?: Viewport | string): void;
    findScope(element: Element): Scope;
    getViewport(name: string): Viewport;
    addViewport(name: string, element: Element, context: IRenderContext | IContainer, options?: IViewportOptions): Viewport;
    removeViewport(viewport: Viewport, element: Element, context: IRenderContext | IContainer): void;
    allViewports(): Viewport[];
    removeScope(scope: Scope): void;
    goto(pathOrViewports: string | Record<string, Viewport>, title?: string, data?: Record<string, unknown>): Promise<void>;
    replace(pathOrViewports: string | Record<string, Viewport>, title?: string, data?: Record<string, unknown>): Promise<void>;
    refresh(): Promise<void>;
    back(): Promise<void>;
    forward(): Promise<void>;
    setNav(name: string, routes: INavRoute[]): void;
    addNav(name: string, routes: INavRoute[]): void;
    findNav(name: string): Nav;
    private cancelNavigation;
    private ensureRootScope;
    private closestScope;
    private replacePaths;
}
//# sourceMappingURL=router.d.ts.map