import React from 'react';

/**
 * This grid allows you to be less verbose by only defining whay you need:
 *
 *    <Grid>
 *      <Grid.Row>
 *        <Grid.Cell>
 *          <p>Foo</p>
 *        </Grid.Cell>
 *      </Grid.Row>
 *    </Grid>
 *
 * Is equivalent of:
 *
 *    <Grid>
 *      <p>Foo</p>
 *    </Grid>
 *
 * Add the missing row and cell declaration are automatically added.
 *
 * Examples
 * --------
 *
 * Render two cells in a row
 *
 *    <Grid>
 *      <Grid.Row>
*          <p>I'm in the first cell</p>
*          <p>I'm in the second cell</p>
 *      </Grid.Row>
 *    </Grid>
 *
 * Render two paragraphs in a cell
 *
 *    <Grid>
 *      <Grid.Cell>
*          <p>I'm in the first cell</p>
*          <p>I'm in the second cell</p>
 *      </Grid.Cell>
 *    </Grid>
 *
 */

const tableStyle = {

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  }

};

function Cell(data) {
  const { children, style = {}, className } = data;
  return <td style={style} className={className}>{children}</td>;
}

function Row(data) {
  const { children, style = {} } = data;
  return (
    <tr style={style}>
      {React.Children.map(children, el => {
        if (el.type === Cell) return el;
        return <td>{el}</td>;
      })}
    </tr>
  );
}

function Grid(data) {
  const { children, style = {} } = data;
  return (
    <table style={{ ...tableStyle.table, ...style }}>
      <tbody>
        {React.Children.map(children, el => {
          if (!el) return;

          if (el.type === Row) return el;

          if (el.type === Cell) {
            return <tr>{el}</tr>;
          }

          return (
            <tr>
              <td>{el}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

Grid.Row = Row;
Grid.Cell = Cell;

export default Grid;
