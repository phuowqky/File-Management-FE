import { Component, OnInit } from '@angular/core';
import { MenuService, Menu } from '../../core/services/menu.service';
export interface TreeNodeInterface extends Menu {
    level?: number;
    expand?: boolean;
    parent?: TreeNodeInterface;
}
import { ActionService, Action } from '../../core/services/action.service';
import { MenuActionService } from '../../core/services/menu-action.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-menus',
    templateUrl: './menus.component.html',
    styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
    searchText = '';
    pageIndex = 1;
    pageSize = 20;
    loading = false;

    allData: Menu[] = [];
    
    // Core property for Zorro Tree Table
    mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
    displayData: TreeNodeInterface[] = []; // Chứa danh sách root nodes để table lặp qua

    iconList = ['home', 'user', 'team', 'lock', 'key', 'apartment', 'menu', 'calendar', 'message', 'setting', 'dashboard', 'file-text', 'bar-chart', 'bell', 'tool', 'folder'];

    // Modal
    isModalVisible = false;
    isEditing = false;
    editingMenu: any = {};
    modalLoading = false;

    // Modal gán Actions
    isActionModalVisible = false;
    currentMenuToAssign: Menu | null = null;
    allActions: Action[] = [];
    assignedActionIds: number[] = [];
    isAssigning = false;

    constructor(
        private menuService: MenuService,
        private actionService: ActionService,
        private menuActionService: MenuActionService,
        private message: NzMessageService
    ) {}

    ngOnInit(): void {
        this.loadMenus();
    }

    loadMenus(): void {
        this.loading = true;
        this.menuService.getAll().subscribe({
            next: (data) => {
                this.allData = data;
                
                // Cấp lại reference cho displayData để Table zorro render lại
                this.displayData = [...data] as TreeNodeInterface[]; 
                
                // Xây dựng lại Map Tree Table rõ ràng reference mới
                const newMap: { [key: string]: TreeNodeInterface[] } = {};
                this.displayData.forEach(item => {
                    newMap[item.id] = this.convertTreeToList(item);
                });
                this.mapOfExpandedData = newMap;
                
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
        if (!$event) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.id === d.id);
                    if (target) {
                        target.expand = false;
                        this.collapse(array, target, false);
                    }
                });
            }
        }
    }

    convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
        const stack: TreeNodeInterface[] = [];
        const array: TreeNodeInterface[] = [];
        const hashMap = {};
        stack.push({ ...root, level: 0, expand: true }); // Mặc định mở hết
        while (stack.length !== 0) {
            const node = stack.pop()!;
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    // Để expand: true để tất cả node con đều tự động rớt ra thay vì bj cuộn
                    stack.push({ ...node.children[i], level: node.level! + 1, expand: true, parent: node } as TreeNodeInterface);
                }
            }
        }
        return array;
    }

    visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
        if (!hashMap[node.id]) {
            hashMap[node.id] = true;
            array.push(node);
        }
    }

    getLevel(item: any): number {
        return item.orderIndex || 0;
    }

    getParentName(parentId: number | null): string {
        if (!parentId) return '— (Gốc)';
        const flattened = this.flattenAndGetRoots(this.allData);
        const parent = flattened.find(m => m.id === parentId);
        return parent ? parent.name : '—';
    }

    onSearch(): void {
        // Tìm kiếm trên client với Tree data khá phức tạp. 
        // Trạng thái đơn giản nhất là refresh bảng.
        // Tạm thời reload data (ở môi trường chuyên nghiệp phần này sẽ được filter tree)
        this.loadMenus();
    }

    onReset(): void {
        this.searchText = '';
        this.loadMenus();
    }

    onPageChange(page: number): void { this.pageIndex = page; }
    onPageSizeChange(size: number): void { this.pageSize = size; this.pageIndex = 1; }

    showAddModal(): void {
        this.isEditing = false;
        this.editingMenu = { name: '', code: '', path: '', icon: 'home', parentId: null, orderIndex: 0 };
        this.isModalVisible = true;
    }

    showEditModal(menu: Menu): void {
        this.isEditing = true;
        this.editingMenu = { ...menu };
        this.isModalVisible = true;
    }

    handleModalOk(): void {
        this.modalLoading = true;
        const payload = {
            name: this.editingMenu.name,
            code: this.editingMenu.code,
            path: this.editingMenu.path,
            icon: this.editingMenu.icon,
            parentId: this.editingMenu.parentId || null,
            orderIndex: this.editingMenu.orderIndex || 0,
            visible: this.editingMenu.visible === false ? false : true
        };
        const req = this.isEditing
            ? this.menuService.update(this.editingMenu.id, payload)
            : this.menuService.create(payload);

        req.subscribe({
            next: () => { this.isModalVisible = false; this.modalLoading = false; this.loadMenus(); },
            error: () => { this.modalLoading = false; }
        });
    }

    handleModalCancel(): void { this.isModalVisible = false; }

    deleteMenu(menu: Menu): void {
        this.menuService.delete(menu.id).subscribe({ next: () => this.loadMenus() });
    }

    // Lấy danh sách flat menu gốc cho dropdown parent
    flattenAndGetRoots(items: Menu[]): Menu[] {
        let result: Menu[] = [];
        for (const item of items) {
            result.push(item);
            if (item.children) {
                result = result.concat(this.flattenAndGetRoots(item.children));
            }
        }
        return result;
    }

    getRootMenus(): Menu[] {
        const flattened = this.flattenAndGetRoots(this.allData);
        return flattened.filter(m => !m.parentId);
    }

    // ---------------------------------------------
    // Assign Actions Drawer Logic
    // ---------------------------------------------
    openAssignActionsModal(menu: Menu): void {
        this.currentMenuToAssign = menu;
        this.isActionModalVisible = true;
        this.assignedActionIds = [];
        this.allActions = [];

        // Fetch all actions
        this.actionService.getAll().subscribe(actions => {
            this.allActions = actions;
        });

        // Fetch assigned actions for this menu
        this.menuActionService.getActionsByMenu(menu.id).subscribe(assigned => {
            this.assignedActionIds = assigned.map(a => a.actionId);
        });
    }

    closeModal(): void {
        this.isActionModalVisible = false;
        this.currentMenuToAssign = null;
    }

    onActionCheckChange(actionId: number, isChecked: boolean): void {
        if (!this.currentMenuToAssign) return;
        this.isAssigning = true;

        if (isChecked) {
            // Assign
            this.menuActionService.assignActionToMenu(this.currentMenuToAssign.id, actionId).subscribe({
                next: () => {
                    this.message.success('Đã gán quyền thành công!');
                    this.assignedActionIds.push(actionId);
                    this.isAssigning = false;
                },
                error: (err) => {
                    this.message.error(err.error?.message || 'Lỗi khi gán quyền');
                    this.isAssigning = false;
                }
            });
        } else {
            // Remove
            this.menuActionService.removeActionFromMenu(this.currentMenuToAssign.id, actionId).subscribe({
                next: () => {
                    this.message.success('Đã thu hồi quyền thành công!');
                    this.assignedActionIds = this.assignedActionIds.filter(id => id !== actionId);
                    this.isAssigning = false;
                },
                error: (err) => {
                    this.message.error(err.error?.message || 'Lỗi khi thu hồi quyền');
                    this.isAssigning = false;
                }
            });
        }
    }

    isActionAssigned(actionId: number): boolean {
        return this.assignedActionIds.includes(actionId);
    }
}
