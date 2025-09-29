const UserController = require("./user-controller.js");
const User = require("./user.js");

test('add user to userController', () => {    
    const userController = new UserController();
    let user = new User(1234,"Santiago", "santiago@generation.org");
    userController.add(user);    
    expect(userController.getUsers()).toContain(user);
});

test('remove user to userController', () => {    
    const userController = new UserController();
    let user = new User(1234,"Santiago", "santiago@generation.org");
    userController.add(user);    
    userController.remove(user);
    expect(userController.users).not.toContain(user);
});

// 1. Test para add() - usuario que NO está en la lista
test('add() should successfully add a user that is not in the list', () => {
    const userController = new UserController();
    
    // Agregar un usuario inicial
    const existingUser = new User(1, "Maria", "maria@test.com");
    userController.add(existingUser);
    
    // Intentar agregar un usuario NUEVO (que no está en la lista)
    const newUser = new User(2, "Pedro", "pedro@test.com");
    userController.add(newUser);
    
    // Verificar que el nuevo usuario fue agregado
    expect(userController.getUsers()).toContain(newUser);
    expect(userController.getUsers()).toHaveLength(2);
});

// 2. Test para remove() - usuario que NO está en la lista
test('remove() should not affect the list when trying to remove a user that is not in the list', () => {
    const userController = new UserController();
    
    // Agregar usuarios iniciales
    const user1 = new User(1, "Ana", "ana@test.com");
    const user2 = new User(2, "Luis", "luis@test.com");
    userController.add(user1);
    userController.add(user2);
    
    // Intentar remover un usuario que NO está en la lista
    const nonExistentUser = new User(999, "Fantasma", "fantasma@test.com");
    userController.remove(nonExistentUser);
    
    // Verificar que la lista no cambió
    expect(userController.getUsers()).toHaveLength(2);
    expect(userController.getUsers()).toContain(user1);
    expect(userController.getUsers()).toContain(user2);
});

// 3. Tests para findByEmail() - 2 pruebas unitarias
test('findByEmail() should return the user when email exists', () => {
    const userController = new UserController();
    
    const user1 = new User(1, "Carlos", "carlos@test.com");
    const user2 = new User(2, "Sofia", "sofia@test.com");
    userController.add(user1);
    userController.add(user2);
    
    // Buscar un email que SÍ existe
    const result = userController.findByEmail("carlos@test.com");
    
    expect(result).toBe(user1);
    expect(result.getName()).toBe("Carlos");
    expect(result.getId()).toBe(1);
});

test('findByEmail() should return undefined when email does not exist', () => {
    const userController = new UserController();
    
    const user1 = new User(1, "Elena", "elena@test.com");
    userController.add(user1);
    
    // Buscar un email que NO existe
    const result = userController.findByEmail("noexiste@test.com");
    
    expect(result).toBeUndefined();
});

// 4. Tests para findById() - 2 pruebas unitarias
test('findById() should return the user when id exists', () => {
    const userController = new UserController();
    
    const user1 = new User(100, "Roberto", "roberto@test.com");
    const user2 = new User(200, "Laura", "laura@test.com");
    userController.add(user1);
    userController.add(user2);
    
    // Buscar un ID que SÍ existe
    const result = userController.findById(200);
    
    expect(result).toBe(user2);
    expect(result.getName()).toBe("Laura");
    expect(result.getEmail()).toBe("laura@test.com");
});

test('findById() should return undefined when id does not exist', () => {
    const userController = new UserController();
    
    const user1 = new User(50, "Diego", "diego@test.com");
    userController.add(user1);
    
    // Buscar un ID que NO existe
    const result = userController.findById(999);
    
    expect(result).toBeUndefined();
});