# GraphJS
Uma biblioteca JavaScript para desenhar gráficos interativos.

Use-a para representar dados em gráficos.

Exemplo de HTML com GraphJS:

```HTML

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Chart Library Example</title>
</head>
<body>
  <div id="chartContainer"></div>
  <script src="graph.js"></script>
  <script>
    const chart = new MyChartLibrary('#chartContainer', {
      type: 'bar',
      width: 800,
      height: 400,
      data: [
        { label: 'Jan', value: 30, color: 'red' },
        { label: 'Feb', value: 20, color: 'green' },
        { label: 'Mar', value: 50, color: 'blue' }
      ]
    });
  </script>
</body>
</html>
```
